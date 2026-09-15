import { findUserByEmail,createUser } from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';

export async function registerUser(firstName, lastName,email,password,phone) {
    if (!firstName || !lastName || !email || !password) {
        throw new Error('First name, last name, email, and password are required');
    }
    let existUser = await findUserByEmail(email);
    if (existUser) {
        throw new Error('email already exist');
    }
    const hashedpassword = await bcrypt.hash(password);
    let userId = await createUser(firstName,lastName,email,hashedpassword,phone,'CLIENT');
    return userId 
}