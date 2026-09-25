import {loginUser, registerUser} from '../services/auth.service.js';
import { verifyEmail } from '../services/emailVerification.service.js';
import { findUserById } from '../repositories/user.repository.js';

export function showRegister(req, res) {
    res.render('auth/register');
}

export async function register(req, res) {
    const {firstName,lastName,email,password,phone} = req.body;
    try {
        const result = await registerUser(firstName,lastName,email,password,phone);
        const user = await findUserById(result.userId);
        req.session.user = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role
        };
        return res.redirect('/dashboard');
    } catch (error) {
        return res.status(400).render('auth/register', {
            error: error.message
        });
    }
}

export function showLogin(req, res) {
    res.render('auth/login');
}

export async function login(req,res) {
    let {email,password} = req.body;
    try {
        let user = await loginUser(email,password);
        req.session.user = {
        id: user.id, 
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
    };

    res.redirect('/dashboard');
    } catch (error) {
        res.status(401).render('auth/login', {
            error: error.message,
            email
        })
    }
}

export function showDashboard(req, res) {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/auth/login');
    }

    if (user.role === 'CLIENT') {
        return res.redirect('/client/dashboard');
    }

    if (user.role === 'CHARGE_CLIENT') {
        return res.redirect('/manager/dashboard');
    }

    if (user.role === 'ADMIN') {
        return res.redirect('/admin/dashboard');
    }

    return res.status(403).send('Invalid user role');
}

export function logout(req,res) {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send('caould not logout');
        }
        res.clearCookie('connect.sid');
        res.redirect('/auth/login')
    });
}

export async function verifyEmailController(req , res) {
    let {token} = req.query;
    try{
        const userId = await verifyEmail(token);
        const verification = await findUserById(userId);
        req.session.user = {
            id: verification.id,
            firstName: verification.first_name,
            lastName: verification.last_name,
            email: verification.email,
            role: verification.role
        };
        return res.redirect('/dashboard');
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

export function showCheckEmail(req, res) {
    res.render('auth/check-email');
}
