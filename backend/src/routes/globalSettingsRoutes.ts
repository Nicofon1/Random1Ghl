import { Router } from 'express';
import * as globalSettingsController from '../controllers/globalSettingsController.js';

const router = Router();

router.get('/', globalSettingsController.getSettings);
router.patch('/', globalSettingsController.updateSettings);

export default router;
