import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.ts';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? 'postgresql://radio:radio@localhost:5432/ajn_radio?schema=public' });
export const prisma = new PrismaClient({ adapter, log: process.env.NODE_ENV === 'development' || process.argv.includes('--dev') ? ['error', 'warn'] : ['error'] });
