import {Router} from "express";
import { showAccounts ,showSingleAccount} from "../controllers/account.controller.js";

let router = Router()

router.get('/',showAccounts)
router.get('/:id',showSingleAccount)
export default router