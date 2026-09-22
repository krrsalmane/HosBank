import { Router } from "express";
import { handleCreateDispute, handleGetUserDisputes } from "../controllers/dispute.controller.js";

const router = Router();

router.post('/', handleCreateDispute);
router.get('/', handleGetUserDisputes);

export default router;