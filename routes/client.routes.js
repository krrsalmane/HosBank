import express from 'express'
import { showClientDashboard } from '../controllers/client.controller.js';
import { requireAuth,authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get(
    '/dashboard',
    requireAuth,
    authorize('CLIENT'),
    showClientDashboard
)

export default router;