import { Router } from 'express';
import {register , showRegister } from '../controllers/auth.controller.js'

const router = Router();

router.get('/register',showRegister)
router.post('/register',register)

export default router;