import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { test } from 'node:test';

const freePort = () => new Promise<number>((resolve, reject) => {
  const probe = createServer();
  probe.listen(0, '127.0.0.1', () => { const { port } = probe.address() as { port: number }; probe.close(() => resolve(port)); });
  probe.on('error', reject);
});

test('npm start really boots the HTTP server in production mode (regression: -e import never started it)', async () => {
  const scripts = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).scripts;
  assert.match(scripts.start, /server\/index\.ts/);
  assert.doesNotMatch(scripts.start, /\s-e\s/);
  const port = await freePort();
  // Run exactly what `npm start` runs, but directly, so SIGTERM reaches the server (npm would orphan it).
  const [command, ...args] = (scripts.start as string).split(/\s+/);
  assert.equal(command, 'node');
  const child = spawn(process.execPath, args, {
    env: { ...process.env, PORT: String(port), NODE_ENV: '', DATABASE_URL: 'postgresql://x:y@127.0.0.1:1/none' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', chunk => { output += chunk; });
  child.stderr.on('data', chunk => { output += chunk; });
  try {
    let body: { status?: string } | null = null;
    for (let attempt = 0; attempt < 60 && !body; attempt += 1) {
      await new Promise(resolve => setTimeout(resolve, 250));
      body = await fetch(`http://127.0.0.1:${port}/api/health`).then(response => response.json() as Promise<{ status?: string }>).catch(() => null);
    }
    assert.ok(body, `server never listened on ${port}. Output:\n${output}`);
    assert.equal(body.status, 'degraded'); // no database reachable here, but the server is up
    assert.doesNotMatch(output, /vite/i); // production must not load the dev server
    const robots = await fetch(`http://127.0.0.1:${port}/robots.txt`);
    assert.match(await robots.text(), /Disallow: \//);
    assert.equal(robots.headers.get('x-robots-tag'), 'noindex, nofollow');
    // Graceful shutdown: SIGTERM must end the process cleanly, quickly.
    const exitCode = await new Promise<number | null>(resolve => {
      const timer = setTimeout(() => resolve(-1), 7000);
      child.once('exit', code => { clearTimeout(timer); resolve(code); });
      child.kill('SIGTERM');
    });
    assert.equal(exitCode, 0, `expected clean exit on SIGTERM, got ${exitCode}. Output:\n${output}`);
  } finally {
    const exited = new Promise(resolve => child.once('exit', resolve));
    if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL'); else child.emit('exit');
    await exited;
    child.stdout.destroy();
    child.stderr.destroy();
  }
});
