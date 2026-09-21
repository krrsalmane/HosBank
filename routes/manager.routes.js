import express from 'express';


import {
    showManagerDashboard,
    showManagerRequestDetails,
    showManagerRequests,
    changeRequestStatus
}from '../controllers/manager.controller.js'

import {
    requireAuth,
    authorize
} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get(
    '/dashboard',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showManagerDashboard
);

router.get(
    '/requests',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showManagerRequests
);

router.get(
    '/requests/:id',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showManagerRequestDetails
);

router.post(
    '/requests/:id/status',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    changeRequestStatus
);

export default router ;