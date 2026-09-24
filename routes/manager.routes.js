import express from 'express';

import {
    showManagerDashboard,
    showManagerRequestDetails,
    showManagerRequests,
    changeRequestStatus,
    showManagerComplaintDetails,
    showManagerComplaints,
    changeComplaintStatus,
    showManagerClients,
    showManagerClientDetails,
    showClientInteractions,
    addManagerComplaintComment,
    addManagerRequestComment,
    showClientAccounts
} from '../controllers/manager.controller.js';

import {
    requireAuth,
    authorize
} from '../middlewares/auth.middleware.js';

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


router.get(
    '/complaints',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showManagerComplaints
);


router.get(
    '/complaints/:id',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showManagerComplaintDetails
);


router.post(
    '/complaints/:id/status',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    changeComplaintStatus
);


router.get(
    '/clients',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showManagerClients
);


router.get(
    '/clients/:id',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showManagerClientDetails
);


router.get(
    '/clients/:id/interactions',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showClientInteractions
);

router.post(
    '/requests/:id/comments',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    addManagerRequestComment
);

router.post(
    '/complaints/:id/comments',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    addManagerComplaintComment
);


router.get(
    '/clients/:id/accounts',
    requireAuth,
    authorize('CHARGE_CLIENT'),
    showClientAccounts
);

export default router;
