// Builds ajn-radio-preview-<short-sha>.zip containing ONLY committed files, with the app at the zip root
// (so Cloud Build finds ./Dockerfile and ./cloudbuild.yaml). Prints the file list, a secret scan, and SHA-256.
// Needs git on PATH. Run from anywhere inside the repo: npm run package:zip
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const run = (cwd, args) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const top = run(appDir, ['rev-parse', '--show-toplevel']).trim();
// Run from the repo root: `git ls-tree` otherwise limits itself to the current subdirectory.
const git = (...args) => run(top, args);
const prefix = path.relative(top, appDir).split(path.sep).join('/');
const sha = git('rev-parse', '--short=10', 'HEAD').trim();
if (git('status', '--porcelain', '--', prefix || '.').trim()) {
  console.warn('WARNING: uncommitted changes in radio-platform/ are NOT in the zip (it is built from commit ' + sha + ').');
}

const tree = prefix ? `HEAD:${prefix}` : 'HEAD';
const files = git('ls-tree', '-r', '--name-only', tree).split('\n').filter(Boolean);

const forbidden = [/^\.env($|\.(?!example$))/, /(^|\/)node_modules\//, /^dist\//, /^dist-zip\//, /^src\/generated\//, /\.zip$/, /\.(crt|pem|key|p12|pfx)$/];
const badPaths = files.filter(file => forbidden.some(rule => rule.test(file)));
if (badPaths.length) { console.error('Refusing to package forbidden paths:\n' + badPaths.join('\n')); process.exit(1); }

const secretRules = [
  ['AWS access key', /AKIA[0-9A-Z]{16}/],
  ['private key block', /-----BEGIN (?:RSA |EC |OPENSSH |DSA |)PRIVATE KEY-----/],
  ['GitHub token', /gh[pousr]_[A-Za-z0-9]{30,}/],
  ['Slack token', /xox[baprs]-[A-Za-z0-9-]{10,}/],
  ['Google API key', /AIza[0-9A-Za-z_-]{35}/],
  ['DB URL with non-placeholder password', /postgres(?:ql)?:\/\/[^:@\s/]+:(?!radio@|postgres@|y@|PASSWORD|password|CHOOSE|<)[^@\s'"`]{4,}@/],
];
const findings = [];
for (const file of files) {
  const text = git('show', prefix ? `HEAD:${prefix}/${file}` : `HEAD:${file}`);
  if (text.includes('\u0000')) continue;
  for (const [name, rule] of secretRules) if (rule.test(text)) findings.push(`${file}: ${name}`);
}
console.log(findings.length ? 'SECRET SCAN: FINDINGS\n' + findings.join('\n') : `SECRET SCAN: clean (${files.length} files, ${secretRules.length} rules)`);
if (findings.length) process.exit(1);

const outDir = path.join(appDir, 'dist-zip');
mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `ajn-radio-preview-${sha}.zip`);
git('archive', '--format=zip', '-o', out, tree);
const hash = createHash('sha256').update(readFileSync(out)).digest('hex');
console.log('\nFILES IN ZIP:\n' + files.join('\n'));
console.log(`\nZIP: ${out}\nSIZE: ${statSync(out).size} bytes\nSHA-256: ${hash}`);
