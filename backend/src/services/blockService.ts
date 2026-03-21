import { prisma } from '../repositories/prisma.js';

export const getAllBlocks = async () => {
  return await prisma.customBlock.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const createBlock = async (data: { name: string; html: string; css: string; category: string }) => {
  return await prisma.customBlock.create({
    data
  });
};

export const updateBlock = async (id: string, data: Partial<{ name: string; html: string; css: string; category: string }>) => {
  return await prisma.customBlock.update({
    where: { id },
    data
  });
};

export const deleteBlock = async (id: string) => {
  return await prisma.customBlock.delete({
    where: { id }
  });
};
