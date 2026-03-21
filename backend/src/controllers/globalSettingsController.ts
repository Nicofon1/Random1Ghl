import type { Request, Response } from 'express';
import * as globalSettingsService from '../services/globalSettingsService.js';

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await globalSettingsService.getGlobalSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching global settings:', error);
    res.status(500).json({ error: 'Failed to fetch global settings' });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const settings = await globalSettingsService.updateGlobalSettings(data);
    res.json(settings);
  } catch (error) {
    console.error('Error updating global settings:', error);
    res.status(500).json({ error: 'Failed to update global settings' });
  }
};
