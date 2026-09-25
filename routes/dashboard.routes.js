import { Router } from "express";
import { showDashboard } from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

let router = Router();
router.get('/',authorize,showDashboard);
export default router;