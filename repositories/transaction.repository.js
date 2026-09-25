import { pool } from "../config/database.js";

export async function updateAccountBalance(accountId, newBalance) {
    let [res] = await pool.query('UPDATE bank_accounts SET balance = ? WHERE id = ?',[newBalance, accountId])
    return res;
}

export async function createTransaction(senderAccountId, receiverAccountId, amount) {
    await pool.query(
        `INSERT INTO transactions (account_id, type, amount, description)
         VALUES (?, 'TRANSFER', ?, ?)`,
        [senderAccountId, amount, `Transfer to account ${receiverAccountId}`]
    );

    const [res] = await pool.query(
        `INSERT INTO transactions (account_id, type, amount, description)
         VALUES (?, 'DEPOSIT', ?, ?)`,
        [receiverAccountId, amount, `Transfer from account ${senderAccountId}`]
    );

    return res
}

export async function findTransactionsByAccountId(accountId) {
    let [res] = await pool.query(
        'SELECT * FROM transactions WHERE account_id = ? ORDER BY created_at DESC',
        [accountId]
    );
    return res
} 
