import { Router } from "express";
import { showDashboard } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

let router = Router();
router.get('/',requireAuth,showDashboard);
export default dashboardRouter;