import { PrismaClient } from '@prisma/client';

const newPrismaClient: PrismaClient = new PrismaClient();
export const prisma = newPrismaClient;