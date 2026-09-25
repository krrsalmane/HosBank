import { Router } from "express";
import { handleGetAdminStats, handleUpdateUserRole, handleDeleteUser, handleGetAllAccounts,showAdminDashboard,showUsers,showCreateUser,createUser,showEditUser,editUser,changeUserStatus,
    showAssignments,
    assignClientToManager,
    showAccounts,
    changeAccountStatus,
    showCards,
    changeCardStatus,
    showTransactions,
    showTransfers,
    showBankRequests,
    changeBankRequestStatus,
    showComplaints,
    changeComplaintStatus } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { authorize } from "../middlewares/auth.middleware.js";

let router = Router();

router.use(authorize, requireAdmin);

router.get('/stats', handleGetAdminStats);
router.patch('/users/role', handleUpdateUserRole);
router.delete('/users/:id', handleDeleteUser);
router.get('/accounts/json', handleGetAllAccounts);




router.get('/dashboard',authorize,authorize('ADMIN'),showAdminDashboard)
router.get('/users',authorize,authorize('ADMIN'),showUsers);
router.get('/users/create',authorize,authorize('ADMIN'),showCreateUser);
router.post('/users/create',authorize,authorize('ADMIN'),createUser);
router.get('/users/:id/edit',authorize,authorize('ADMIN'),showEditUser);
router.post('/users/:id/edit',authorize,authorize('ADMIN'),editUser);
router.post('/users/:id/status',authorize,authorize('ADMIN'),changeUserStatus);
router.get('/assignments',authorize,authorize('ADMIN'),showAssignments);
router.post('/assignments',authorize,authorize('ADMIN'),assignClientToManager);
router.get('/accounts',authorize,authorize('ADMIN'),showAccounts);
router.post('/accounts/:id/status',authorize,authorize('ADMIN'),changeAccountStatus);
router.get('/cards',authorize,authorize('ADMIN'),showCards);
router.post('/cards/:id/status',authorize,authorize('ADMIN'),changeCardStatus);
router.get('/transfers',authorize,authorize('ADMIN'),showTransfers);
router.get('/transactions',authorize,authorize('ADMIN'),showTransactions);
router.get('/requests',authorize,authorize('ADMIN'),showBankRequests);
router.post('/requests/:id/status',authorize,authorize('ADMIN'),changeBankRequestStatus);
router.get('/complaints',authorize,authorize('ADMIN'),showComplaints);
router.post('/complaints/:id/status',authorize,authorize('ADMIN'),changeComplaintStatus);

export default router;