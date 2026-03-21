import { PrismaClient } from '@prisma/client/index.js';
import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();
