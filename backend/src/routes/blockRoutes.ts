import { Router } from 'express';
import * as blockController from '../controllers/blockController.js';

const router = Router();

router.get('/', blockController.getBlocks);
router.post('/', blockController.createBlock);
router.patch('/:id', blockController.updateBlock);
router.delete('/:id', blockController.deleteBlock);

export default router;
