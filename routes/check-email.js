import {register,showRegister,login,showLogin,logout,verifyEmailController,showCheckEmail} from '../controllers/auth.controller.js';
import router from "./auth.routes";

router.get('/check-email',showCheckEmail)
router.get('/verify-email',verifyEmailController);

export default router;