import { Router } from "express";
import { showDashboard } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

let router = Router();
router.get('/',requireAuth,showDashboard);
export default router;