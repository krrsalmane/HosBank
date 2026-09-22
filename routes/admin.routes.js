import express  from 'express'

import {
    showAdminDashboard
} from '../controllers/admin.controller.js'

import {
    requireAuth,
    authorize
}from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get(
    '/dashboard',
    requireAuth,
    authorize('ADMIN'),
    showAdminDashboard
)

export default router;