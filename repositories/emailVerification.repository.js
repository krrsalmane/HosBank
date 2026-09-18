import { pool } from '../config/database.js';

export async function createVerificationToken(userId, token, expiresAt) {
    const [result] = await pool.query(
        `INSERT INTO email_verifications
        (user_id, token, expires_at)
        VALUES (?, ?, ?)`,
        [userId, token, expiresAt]
    );

    return result.insertId;
}

export async function findVerificationByToken(token) {
    const [rows] = await pool.query(
        `SELECT *
         FROM email_verifications
         WHERE token = ?`,
        [token]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
}

export async function markUserEmailAsVerified(userId) {
    console.log('Updating user email verification for user:', userId);

    const [result] = await pool.query(
        `UPDATE users
         SET email_verified = TRUE
         WHERE id = ?`,
        [userId]
    );

    console.log('User update SQL result:', result);

    return result.affectedRows > 0;
}