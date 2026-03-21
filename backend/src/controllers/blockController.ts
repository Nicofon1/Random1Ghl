import type { Request, Response } from 'express';
import * as blockService from '../services/blockService.js';

export const getBlocks = async (_req: Request, res: Response) => {
  try {
    const blocks = await blockService.getAllBlocks();
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
};

export const createBlock = async (req: Request, res: Response) => {
  try {
    const block = await blockService.createBlock(req.body);
    res.status(201).json(block);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create block' });
  }
};

export const updateBlock = async (req: Request, res: Response) => {
  try {
    const block = await blockService.updateBlock(req.params.id as string, req.body);
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update block' });
  }
};

export const deleteBlock = async (req: Request, res: Response) => {
  try {
    await blockService.deleteBlock(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete block' });
  }
};
