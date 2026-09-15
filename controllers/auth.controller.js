import {registerUser} from '../services/auth.service.js';

export function showRegister(req,res) {
    res.render('auth/register');
}

export async function register(req,res) {
    let {firstName,lastName,email,password,phone } = req.body;
    try {
        let userId = await registerUser(firstName,lastName,email,password,phone)
        res.status(201)
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}