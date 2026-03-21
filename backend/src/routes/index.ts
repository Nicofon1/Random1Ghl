import { Router } from 'express';

import globalSettingsRoutes from './globalSettingsRoutes.js';
import blockRoutes from './blockRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/global-settings', globalSettingsRoutes);
router.use('/blocks', blockRoutes);

export default router;
