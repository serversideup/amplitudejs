import assert from 'node:assert/strict';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { test } from 'node:test';
import express from 'express';
import { basicPasswordMatches, noindexMiddleware, previewAccessGate, robotsTxtHandler, secretsMatch } from '../server/preview.ts';

async function withApp(env: NodeJS.ProcessEnv, run: (base: string) => Promise<void>) {
  const app = express();
  app.use(noindexMiddleware(env));
  app.use(previewAccessGate(env));
  app.get('/robots.txt', robotsTxtHandler(env));
  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.post('/api/ingest/x', (_req, res) => res.json({ ok: true }));
  app.get('/', (_req, res) => res.send('home'));
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try { await run(`http://127.0.0.1:${(server.address() as AddressInfo).port}`); }
  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
const basic = (password: string, user = 'anyone') => `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;

test('public preview: open, but noindex header and disallow-all robots.txt', async () => {
  await withApp({}, async base => {
    const home = await fetch(`${base}/`);
    assert.equal(home.status, 200);
    assert.equal(home.headers.get('x-robots-tag'), 'noindex, nofollow');
    assert.match(await (await fetch(`${base}/robots.txt`)).text(), /Disallow: \//);
  });
});

test('ROBOTS_INDEX=allow lifts noindex', async () => {
  await withApp({ ROBOTS_INDEX: 'allow' }, async base => {
    assert.equal((await fetch(`${base}/`)).headers.get('x-robots-tag'), null);
    assert.match(await (await fetch(`${base}/robots.txt`)).text(), /Allow: \//);
  });
});

test('authenticated preview: 401 without password, ok with it, health and ingest exempt', async () => {
  const env = { PREVIEW_ACCESS: 'authenticated', PREVIEW_PASSWORD: 's3cret' };
  await withApp(env, async base => {
    const denied = await fetch(`${base}/`);
    assert.equal(denied.status, 401);
    assert.match(denied.headers.get('www-authenticate') ?? '', /Basic/);
    assert.equal((await fetch(`${base}/`, { headers: { authorization: basic('wrong') } })).status, 401);
    assert.equal((await fetch(`${base}/`, { headers: { authorization: basic('s3cret') } })).status, 200);
    assert.equal((await fetch(`${base}/api/health`)).status, 200);
    assert.equal((await fetch(`${base}/api/ingest/x`, { method: 'POST' })).status, 200);
  });
});

test('authenticated without a password fails closed; bad mode throws', async () => {
  await withApp({ PREVIEW_ACCESS: 'authenticated' }, async base => {
    assert.equal((await fetch(`${base}/`)).status, 401);
    assert.equal((await fetch(`${base}/`, { headers: { authorization: basic('') } })).status, 401);
  });
  assert.throws(() => previewAccessGate({ PREVIEW_ACCESS: 'maybe' }), /PREVIEW_ACCESS/);
});

test('secret comparison helpers', () => {
  assert.equal(secretsMatch('a', 'a'), true);
  assert.equal(secretsMatch('a', 'ab'), false);
  assert.equal(basicPasswordMatches('pw', undefined), false);
  assert.equal(basicPasswordMatches('pw', 'Bearer pw'), false);
  assert.equal(basicPasswordMatches('pw', basic('pw')), true);
  assert.equal(basicPasswordMatches('pw', basic('pw:with:colons'.slice(0, 2))), true);
});
