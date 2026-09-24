import { pool } from '../config/database.js';

export async function getClientAccounts(
    clientId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            bank_accounts.id,
            bank_accounts.account_number,
            bank_accounts.type,
            bank_accounts.balance,
            bank_accounts.status,
            bank_accounts.created_at
         FROM bank_accounts
         INNER JOIN bank_requests
            ON bank_requests.user_id = bank_accounts.user_id
         WHERE bank_accounts.user_id = ?
           AND bank_requests.assigned_to = ?
         GROUP BY
            bank_accounts.id,
            bank_accounts.account_number,
            bank_accounts.type,
            bank_accounts.balance,
            bank_accounts.status,
            bank_accounts.created_at
         ORDER BY bank_accounts.created_at DESC`,
        [
            clientId,
            managerId
        ]
    );

    return rows;
}