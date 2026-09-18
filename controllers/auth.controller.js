import {loginUser, registerUser} from '../services/auth.service.js';
import { verifyEmail } from '../services/emailVerification.service.js';

export function showRegister(req,res) {
    res.render('auth/register');
}

export async function register(req, res) {
    const {firstName,lastName,email,password,phone} = req.body;
    try {
        const result = await registerUser(firstName,lastName,email,password,phone);
        return res.redirect('/auth/check-email');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export function showLogin(req,res) {
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
        res.status(401).send(error.message)
    }
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

export function showDashboard(req,res) {
    res.render('/dashboard/index',{
        user : req.session.user
    });
}

export async function verifyEmailController(req , res) {
    let {token} = req.query;
    try{
        await verifyEmail(token);
        return res.send('email verified succesfully')
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

export function showCheckEmail(req, res) {
    res.render('auth/check-email');
}