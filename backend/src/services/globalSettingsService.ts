import { prisma } from '../repositories/prisma.js';

export const getGlobalSettings = async () => {
  let settings = await prisma.globalSettings.findFirst();

  if (!settings) {
    settings = await prisma.globalSettings.create({
      data: {} // Uses schema defaults
    });
  }

  return settings;
};

export const updateGlobalSettings = async (data: Partial<Parameters<typeof prisma.globalSettings.update>[0]['data']>) => {
  const currentSettings = await getGlobalSettings();

  const settings = await prisma.globalSettings.update({
    where: { id: currentSettings.id },
    data
  });

  return settings;
};
