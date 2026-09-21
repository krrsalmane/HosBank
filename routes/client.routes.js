import express from 'express';

import {
    showClientDashboard,
    showAccounts,
    showAccountDetails,
    showBeneficiaries,
    showAddBeneficiary,
    addBeneficiary,
    showEditBeneficiary,
    editBeneficiary,
    removeBeneficiary,
    showTransferForm,
    showTransferConfirmation,
    makeTransfer,
    showTransactionHistory,
    showClientRequestDetails,
    showClientRequests,
    createClientRequest
} from '../controllers/client.controller.js';

import {
    requireAuth,
    authorize
} from '../middlewares/auth.middleware.js';

const router = express.Router();


// ====================
// DASHBOARD
// ====================

router.get(
    '/dashboard',
     requireAuth,
     authorize('CLIENT'),
    showClientDashboard
);


// ====================
// ACCOUNTS
// ====================

router.get(
    '/accounts',
    requireAuth,
    authorize('CLIENT'),
    showAccounts
);

router.get(
    '/accounts/:id',
    requireAuth,
    authorize('CLIENT'),
    showAccountDetails
);


// ====================
// BENEFICIARIES
// ====================

router.get(
    '/beneficiaries',
    showBeneficiaries
);

router.get(
    '/beneficiaries/add',
    showAddBeneficiary
);

router.post(
    '/beneficiaries/add',
    addBeneficiary
);

router.get(
    '/beneficiaries/:id/edit',
    showEditBeneficiary
);

router.post(
    '/beneficiaries/:id/edit',
    editBeneficiary
);

router.post(
    '/beneficiaries/:id/delete',
    removeBeneficiary
);

//================
//    TRANSFERS
//===============

router.get(
    '/transfers',
    requireAuth,
    authorize('CLIENT'),
    showTransferForm
);

router.post(
    '/transfers/confirm',
    requireAuth,
    authorize('CLIENT'),
    showTransferConfirmation
);


router.post(
    '/transfers',
    requireAuth,
    authorize('CLIENT'),
    makeTransfer
);

router.get(
    '/transfers/history',
    requireAuth,
    authorize('CLIENT'),
    showTransactionHistory
);



//==============
//  REQUEST
//==============


router.get(
    '/requests',
    requireAuth,
    authorize('CLIENT'),
    showClientRequests
);

router.post(
    '/requests',
    requireAuth,
    authorize('CLIENT'),
    createClientRequest
);

router.get(
    '/requests/:id',
    requireAuth,
    authorize('CLIENT'),
    showClientRequestDetails
);



export default router;