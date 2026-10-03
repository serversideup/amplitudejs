// Imports the AJN feeds into Postgres. Safe to run repeatedly (idempotent).
//   npm run sources:sync          (or: node --experimental-strip-types scripts/sources-sync.ts)
// Exit code 1 if any source failed. Intended for Cloud Run Jobs / Cloud Scheduler as well as local use.
import { prisma } from '../server/db.ts';
import { syncAllSources } from '../server/sources/sync.ts';

try {
  const reports = await syncAllSources({ prisma });
  console.log(JSON.stringify(reports, null, 2));
  if (reports.some(report => report.status === 'error')) process.exitCode = 1;
} catch (error) {
  console.error('sources:sync failed', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
