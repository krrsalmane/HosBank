import pool from '../config/db.js';

export async function getClientTransactions(userId) {
    const [rows] = await pool.query(
        `SELECT
            transactions.id,
            transactions.type,
            transactions.amount,
            transactions.description,
            transactions.created_at,
            bank_accounts.account_number
         FROM transactions
         INNER JOIN bank_accounts
            ON transactions.account_id = bank_accounts.id
         WHERE bank_accounts.user_id = ?
         ORDER BY transactions.created_at DESC`,
        [userId]
    );

    return rows;
}