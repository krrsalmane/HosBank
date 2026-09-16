import {createVerificationToken,findVerificationByToken,markVerificationAsVerified} from '../repositories/emailVerification.repository.js';
import {markUserEmailAsVerified} from '../repositories/user.repository.js';
import { markUserEmailAsVerified } from '../repositories/emailVerification.repository.js';

export async function createEmailVerification(userId) {
    let token = crypto.randomBytes(32).toString('hex');
    let expiresAt = new Date(Date.now() +24*60*60*1000);
    await createVerificationToken(userId,token,expiresAt);
    return token;
}

export async function verifyEmail(token) {
    if (!token) {
        throw new Error('verification token is required');
    }
    let verification = await findVerificationByToken(token);
    if(!verification) {
        throw new Error('invalid verification token')
    }
    if (verification.verified_at !== null) {
        throw new Error('email is already verifird')
    }
    if (new Date(verification.expiresAt !== new Date())) {
        throw new Error('verification token has expired');
    }
    await markUserEmailAsVerified(verification.user_id);
    await markVerificationAsVerified(verification.id);
    return true;
}