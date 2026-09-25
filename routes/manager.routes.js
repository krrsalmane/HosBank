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
    authorize
} from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get(
    '/dashboard',
    authorize,
    authorize('CHARGE_CLIENT'),
    showManagerDashboard
);


router.get(
    '/requests',
    authorize,
    authorize('CHARGE_CLIENT'),
    showManagerRequests
);


router.get(
    '/requests/:id',
    authorize,
    authorize('CHARGE_CLIENT'),
    showManagerRequestDetails
);


router.post(
    '/requests/:id/status',
    authorize,
    authorize('CHARGE_CLIENT'),
    changeRequestStatus
);


router.get(
    '/complaints',
    authorize,
    authorize('CHARGE_CLIENT'),
    showManagerComplaints
);


router.get(
    '/complaints/:id',
    authorize,
    authorize('CHARGE_CLIENT'),
    showManagerComplaintDetails
);


router.post(
    '/complaints/:id/status',
    authorize,
    authorize('CHARGE_CLIENT'),
    changeComplaintStatus
);


router.get(
    '/clients',
    authorize,
    authorize('CHARGE_CLIENT'),
    showManagerClients
); 


router.get(
    '/clients/:id',
    authorize,
    authorize('CHARGE_CLIENT'),
    showManagerClientDetails
);


router.get(
    '/clients/:id/interactions',
    authorize,
    authorize('CHARGE_CLIENT'),
    showClientInteractions
);

router.post(
    '/requests/:id/comments',
    authorize,
    authorize('CHARGE_CLIENT'),
    addManagerRequestComment
);

router.post(
    '/complaints/:id/comments',
    authorize,
    authorize('CHARGE_CLIENT'),
    addManagerComplaintComment
);


router.get(
    '/clients/:id/accounts',
    authorize,
    authorize('CHARGE_CLIENT'),
    showClientAccounts
);

export default router;
