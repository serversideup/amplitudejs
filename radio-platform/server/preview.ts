import { createHash, timingSafeEqual } from 'node:crypto';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

/** Preview deployments are public but not indexed unless ROBOTS_INDEX=allow. */
export function noindexMiddleware(env: NodeJS.ProcessEnv = process.env): RequestHandler {
  return (_req, res, next) => {
    if (env.ROBOTS_INDEX !== 'allow') res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
  };
}

export function robotsTxtHandler(env: NodeJS.ProcessEnv = process.env): RequestHandler {
  return (_req, res) => {
    res.type('text/plain').send(env.ROBOTS_INDEX === 'allow' ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n');
  };
}

const digest = (value: string) => createHash('sha256').update(value).digest();

/** Constant-time comparison of two strings of any length. */
export function secretsMatch(expected: string, received: string) {
  return timingSafeEqual(digest(expected), digest(received));
}

export function basicPasswordMatches(password: string, authorization: string | undefined) {
  if (!authorization?.startsWith('Basic ')) return false;
  const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
  const separator = decoded.indexOf(':');
  return separator >= 0 && secretsMatch(password, decoded.slice(separator + 1));
}

/**
 * PREVIEW_ACCESS=public (default): no gate.
 * PREVIEW_ACCESS=authenticated: HTTP Basic with PREVIEW_PASSWORD (any username) on everything except
 * /api/health (needed by the platform) and /api/ingest/* (protected by its own bearer token).
 * If authenticated is requested without a password the gate fails closed.
 */
export function previewAccessGate(env: NodeJS.ProcessEnv = process.env): RequestHandler {
  const mode = env.PREVIEW_ACCESS ?? 'public';
  if (mode !== 'public' && mode !== 'authenticated') throw new Error(`PREVIEW_ACCESS must be "public" or "authenticated", got "${mode}"`);
  return (req: Request, res: Response, next: NextFunction) => {
    if (mode === 'public') return next();
    if (req.path === '/api/health' || req.path.startsWith('/api/ingest/')) return next();
    const password = env.PREVIEW_PASSWORD;
    if (password && basicPasswordMatches(password, req.get('authorization'))) return next();
    res.setHeader('WWW-Authenticate', 'Basic realm="AJN Radio preview", charset="UTF-8"');
    res.status(401).type('text/plain').send('Authentication required');
  };
}
