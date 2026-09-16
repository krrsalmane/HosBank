import { Router } from 'express';
import {register , showLogin, showRegister , logout} from '../controllers/auth.controller.js'

const router = Router();

router.get('/register',showRegister)
router.post('/register',register)
router.get('/login',showLogin);
router.post('/login',showLogin);
router.post('/logout',logout)

export default router;