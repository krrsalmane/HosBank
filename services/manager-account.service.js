import { pool } from '../config/database.js';
import { getAssignedClientById } from './manager-client.service.js';

export async function getClientAccounts(
    clientId,
    managerId
) {
    const client = await getAssignedClientById(clientId, managerId);

    if (!client) {
        return [];
    }

    const [rows] = await pool.query(
        `SELECT
            bank_accounts.id,
            bank_accounts.account_number,
            bank_accounts.type,
            bank_accounts.balance,
            bank_accounts.status,
            bank_accounts.created_at
         FROM bank_accounts
         WHERE bank_accounts.user_id = ?
         ORDER BY bank_accounts.created_at DESC`,
        [clientId]
    );

    return rows;
}
