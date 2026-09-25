import {
    findUserByEmail,
    createUser
} from "../repositories/user.repository.js";

import bcrypt from 'bcrypt';

import {
    createEmailVerification
} from "./emailVerification.service.js";


export async function registerUser(
    firstName,
    lastName,
    email,
    password,
    phone
) {

    if (!firstName || !lastName || !email || !password) {
        throw new Error(
            'First name, last name, email, and password are required'
        );
    }

    const existUser =
        await findUserByEmail(email);

    if (existUser) {
        throw new Error(
            'email already exist'
        );
    }

    const hashedpassword =
        await bcrypt.hash(password, 10);

    const userId =
        await createUser(
            firstName,
            lastName,
            email,
            hashedpassword,
            phone || null,
            'CLIENT'
        );

    const verificationToken =
        await createEmailVerification(
            userId,
            email
        );

    return {
        userId,
        verificationToken
    };
}


export async function loginUser(email, password) {

    if (!email || !password) {
        throw new Error(
            'Email and password are required'
        );
    }

    const user =
        await findUserByEmail(email);

    if (!user) {
        throw new Error(
            'Invalid email or password'
        );
    }

    const passwordMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!passwordMatch) {
        throw new Error(
            'Invalid email or password'
        );
    }

    if (!user.active) {
        throw new Error(
            'This account has been deactivated'
        );
    }

    return user;
}

    
