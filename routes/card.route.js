import { Router } from "express";
import { handleRequestVirtualCard } from "../controllers/card.controller";

let router = Router();

router.post('/virtual',handleRequestVirtualCard)

export default router;