import {createVerificationToken,findVerificationByToken,markUserEmailAsVerified,markVerificationAsVerified} from '../repositories/emailVerification.repository.js';
import { randomBytes } from 'node:crypto';
import { sendVerificationEmail } from '../config/mail.js';

export async function createEmailVerification(userId,email) {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
    );
    await createVerificationToken(userId,token,expiresAt);
    try {
        await sendVerificationEmail(email,token);
    } catch (error) {
        // Email is a notification; delivery issues should not block registration.
        console.error('Verification email could not be sent:', error.message);
    }
    return token;
}

export async function verifyEmail(token) {
    if (!token) {
        throw new Error('Verification token is required');
    }

    const verification = await findVerificationByToken(token);
    if (!verification) {
        throw new Error('Invalid verification token');
    }

    if (verification.verified_at !== null) {
        throw new Error('Email is already verified');
    }

    if (new Date(verification.expires_at) < new Date()) {
        throw new Error('Verification token has expired');
    }

    const userUpdated = await markUserEmailAsVerified(verification.user_id);
    if (!userUpdated) {
        throw new Error(
            'User email verification update failed'
        );
    }

    const verificationUpdated =
        await markVerificationAsVerified(
            verification.id
        );

    if (!verificationUpdated) {
        throw new Error(
            'Verification record update failed'
        );
    }

    return verification.user_id;
}
