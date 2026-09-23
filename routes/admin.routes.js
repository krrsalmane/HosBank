import express  from 'express'

import {
    showAdminDashboard
} from '../controllers/admin.controller.js'

import {
    requireAuth,
    authorize
}from '../middlewares/auth.middleware.js'

import {
    showAdminDashboard,
    showUsers,
    showCreateUser,
    createUser,
    showEditUser,
    editUser,
    changeUserStatus,
    showAssignments,
    assignClientToManager,
    showAccounts,
    changeAccountStatus,
    showCards,
    changeCardStatus,
    showTransactions,
    showTransfers
} from '../controllers/admin.controller.js';

const router = express.Router();

router.get(
    '/dashboard',
    requireAuth,
    authorize('ADMIN'),
    showAdminDashboard
)


router.get(
    '/users',
    requireAuth,
    authorize('ADMIN'),
    showUsers
);

router.get(
    '/users/create',
    requireAuth,
    authorize('ADMIN'),
    showCreateUser
);

router.post(
    '/users/create',
    requireAuth,
    authorize('ADMIN'),
    createUser
);

router.get(
    '/users/:id/edit',
    requireAuth,
    authorize('ADMIN'),
    showEditUser
);

router.post(
    '/users/:id/edit',
    requireAuth,
    authorize('ADMIN'),
    editUser
);

router.post(
    '/users/:id/status',
    requireAuth,
    authorize('ADMIN'),
    changeUserStatus
);

router.get(
    '/assignments',
    requireAuth,
    authorize('ADMIN'),
    showAssignments
);

router.post(
    '/assignments',
    requireAuth,
    authorize('ADMIN'),
    assignClientToManager
);


router.get(
    '/accounts',
    requireAuth,
    authorize('ADMIN'),
    showAccounts
);

router.post(
    '/accounts/:id/status',
    requireAuth,
    authorize('ADMIN'),
    changeAccountStatus
);


router.get(
    '/cards',
    requireAuth,
    authorize('ADMIN'),
    showCards
);

router.post(
    '/cards/:id/status',
    requireAuth,
    authorize('ADMIN'),
    changeCardStatus
);


router.get(
    '/transfers',
    requireAuth,
    authorize('ADMIN'),
    showTransfers
);

router.get(
    '/transactions',
    requireAuth,
    authorize('ADMIN'),
    showTransactions
);

export default router;