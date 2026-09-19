import express from 'express'
import { showClientDashboard } from '../controllers/client.controller.js';
import { requireAuth,authorize } from '../middlewares/auth.middleware.js';
import { showAccounts } from '../controllers/client.controller.js';
import { showAccountDetails } from '../controllers/client.controller.js';

const router = express.Router();

router.get(
    '/dashboard',
    // requireAuth,
   // authorize('CLIENT'),
    showClientDashboard
)

router.get(
    '/accounts',
    requireAuth,
    authorize('CLIENT'),
    showAccounts
)

router.get(
    '/accounts/:id',
    requireAuth,
    authorize('CLIENT'),
    showAccountDetails
)

export default router;