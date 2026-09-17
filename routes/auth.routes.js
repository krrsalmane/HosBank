import { Router } from 'express';
import {register 
    , showLogin
    , showRegister 
    , logout,
    showDashboard}
     from '../controllers/auth.controller.js';

import {
    requireAuth,
    authorize
} from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/register',showRegister)
router.post('/register',register)
router.get('/login',showLogin);
router.post('/login',showLogin);
router.post('/logout',logout);


router.get(
    '/dashbord',
    requireAuth,
    showDashboard

);

router.get(
    '/client/dashboard',
    requireAuth,
    (res,req) =>
    {
        res.render('client/dashborad'),{
            user: req.session.user
        }
    }
)



export default router;







