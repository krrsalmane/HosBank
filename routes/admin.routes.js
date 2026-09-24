import { Router } from "express";
import { handleGetAdminStats, handleGetAllUsers, handleUpdateUserRole, handleDeleteUser, handleGetAllAccounts } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

let router = Router();

router.use(requireAuth, requireAdmin);

router.get('/stats', handleGetAdminStats);
router.get('/users', handleGetAllUsers);
router.patch('/users/role', handleUpdateUserRole);
router.delete('/users/:id', handleDeleteUser);
router.get('/accounts', handleGetAllAccounts);

export default router;