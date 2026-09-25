import { Router } from "express";
import { handleTransfer , showAccountTransactions} from "../controllers/transaction.controller.js";

let router = Router()

router.post('/',handleTransfer)
router.get('/:id',showAccountTransactions)
export default router
