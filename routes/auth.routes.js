import { Router } from 'express';

import {
    showRegister,
    register,
    showLogin,
    login,
    logout,
    verifyEmailController,
    showCheckEmail
} from '../controllers/auth.controller.js';

const router = Router();

router.get('/register', showRegister);

router.post('/register', register);

router.get('/login', showLogin);

router.post('/login', login);

router.post('/logout', logout);

router.get('/check-email', showCheckEmail);

router.get(
    '/verify-email',
    verifyEmailController
);

export default router;