import { Router } from "express";
import { handleRequestVirtualCard } from "../controllers/card.controller.js";

let router = Router();

router.post('/virtual',handleRequestVirtualCard)

export default router;