import { Router } from "express";
import { handleTransfer } from "../controllers/transaction.controller.js";

let router = Router()

router.post('/',handleTransfer)
export default router
