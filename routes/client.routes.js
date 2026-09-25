import express from 'express';

import {
    showClientDashboard,
    showAccounts,
    createClientAccount,
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
    createClientRequest,
    showClientCards,
    showCardOpposition,
    requestCardOpposition,
    showPinRequest,
    requestPinRecalculation,
    showComplaints,
    createClientComplaint,
    showClientComplaintDetails

} from '../controllers/client.controller.js';

import {
    authorize,
} from '../middlewares/auth.middleware.js';

const router = express.Router();


// ====================
// DASHBOARD
// ====================

router.get(
    '/dashboard',
     authorize,
     authorize('CLIENT'),
    showClientDashboard
);


// ====================
// ACCOUNTS
// ====================

router.get(
    '/accounts',
    authorize,
    authorize('CLIENT'),
    showAccounts
);

router.post(
    '/accounts',
    authorize,
    authorize('CLIENT'),
    createClientAccount
);

router.get(
    '/accounts/:id',
    authorize,
    authorize('CLIENT'),
    showAccountDetails
);


// ====================
// BENEFICIARIES
// ====================

router.get(
    '/beneficiaries',
    authorize,
    authorize('CLIENT'),
    showBeneficiaries
);

router.get(
    '/beneficiaries/add',
    authorize,
    authorize('CLIENT'),
    showAddBeneficiary
);

router.post(
    '/beneficiaries/add',
    authorize,
    authorize('CLIENT'),
    addBeneficiary
);

router.get(
    '/beneficiaries/:id/edit',
    authorize,
    authorize('CLIENT'),
    showEditBeneficiary
);

router.post(
    '/beneficiaries/:id/edit',
    authorize,
    authorize('CLIENT'),
    editBeneficiary
);

router.post(
    '/beneficiaries/:id/delete',
    authorize,
    authorize('CLIENT'),
    removeBeneficiary
);

//================
//    TRANSFERS
//===============

router.get(
    '/transfers',
    authorize,
    authorize('CLIENT'),
    showTransferForm
);

router.post(
    '/transfers/confirm',
    authorize,
    authorize('CLIENT'),
    showTransferConfirmation
);


router.post(
    '/transfers',
    authorize,
    authorize('CLIENT'),
    makeTransfer
);

router.get(
    '/transfers/history',
    authorize,
    authorize('CLIENT'),
    showTransactionHistory
);



//==============
//  REQUEST
//==============


router.get(
    '/requests',
    authorize,
    authorize('CLIENT'),
    showClientRequests
);

router.post(
    '/requests',
    authorize,
    authorize('CLIENT'),
    createClientRequest
);

router.get(
    '/requests/:id',
    authorize,
    authorize('CLIENT'),
    showClientRequestDetails
);


router.get(
    '/cards',
    authorize,
    authorize('CLIENT'),
    showClientCards
)

router.get(
    '/cards/opposition',
    authorize,
    authorize('CLIENT'),
    showCardOpposition
)

router.post(
    '/cards/opposition',
    authorize,
     authorize('CLIENT'),
    requestCardOpposition
)


router.get(
    '/cards/pin-request',
    authorize,
    authorize('CLIENT'),
    showPinRequest
);

router.post(
    '/cards/pin-request',
    authorize,
    authorize('CLIENT'),
    requestPinRecalculation
);

//==================
// complaints
//==============


router.get(
    '/complaints',
    authorize,
    authorize('CLIENT'),
    showComplaints
);

router.post(
    '/complaints',
    authorize,
    authorize('CLIENT'),
    createClientComplaint
);

router.get(
    '/complaints/:id',
    authorize,
    authorize('CLIENT'),
    showClientComplaintDetails
);

export default router;
