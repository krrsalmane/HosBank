import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('auth/verification', {
        error: null,
        message: null
    });
});

export default router;