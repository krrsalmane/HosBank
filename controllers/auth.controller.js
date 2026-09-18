import { loginUser, registerUser } from '../services/auth.service.js';

export function showRegister(req, res) {
    res.render('auth/register');
}


export async function register(req, res) {

    const {
        firstName,
        lastName,
        email,
        password,
        phone
    } = req.body;

    try {

        await registerUser(
            firstName,
            lastName,
            email,
            password,
            phone
        );

        res.redirect('/auth/login');

    } catch (error) {

        res.status(400).render('auth/register', {
            error: error.message
        });

    }
}

export function showLogin(req, res) {
    res.render('auth/login');
}


export async function login(req, res) {

    const { email, password } = req.body;

    try {

        const user = await loginUser(email, password);

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
            error: error.message
        });

    }
}

export function logout(req, res) {

    req.session.destroy((error) => {

        if (error) {
            return res.status(500).send('Could not logout');
        }

        res.clearCookie('connect.sid');

        res.redirect('/auth/login');
    });
}

export function showDashboard(req, res) {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/auth/login');
    }

    if (user.role === 'CLIENT') {
        return res.redirect('/client/dashboard');
    }

    if (user.role === 'MANAGER') {
        return res.redirect('/manager/dashboard');
    }

    if (user.role === 'ADMIN') {
        return res.redirect('/admin/dashboard');
    }

    return res.status(403).send('Invalid user role');
}