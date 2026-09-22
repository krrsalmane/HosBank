import { pool } from "../config/database.js";

export async function updateAccountBalance(accountId, newBalance) {
    let [res] = await pool.query('UPDATE bank_accounts SET balance = ? WHERE id = ?',[accountId,newBalance])
    return res;
}

export async function createTransaction(senderAccountId, receiverAccountId, amount) {
    let [res] = await pool.query('INSERT INTO transactions (sender_account_id,receiver_account_id,amount) VALUES (?,?,?)',[senderAccountId,receiverAccountId,amount])
    return res
}

export async function findTransactionsByAccountId(accountId) {
    let [res] = await pool.query('SELECT * FROM transactions WHERE sender_account_id = ? OR receiver_account_id = ? ORDER BY created_at = ? DESC ',[accountId,accountId]);
    return res
} 

