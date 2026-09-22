import { pool } from "../config/database.js";

export async function createDispute({ userId, transactionId, reason }) {
    let [res] = await pool.query(
        'INSERT INTO disputes (user_id, transaction_id, reason, status) VALUES (?, ?, ?, ?)',
        [userId, transactionId, reason, 'PENDING']
    );
    return res;
}

export async function findDisputesByUserId(userId) {
    let [res] = await pool.query(
        'SELECT * FROM disputes WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    return res;
}