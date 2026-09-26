import { pool } from "../config/database.js"

export async function findAccountsByUserId(userId) {
    let [res] = await pool.query('SELECT * FROM bank_accounts WHERE user_id = ?',[userId]) 
    return res;
}

export async function findAccountById(accountId){
    let [rows] = await pool.query('SELECT * FROM bank_accounts WHERE id = ?',[accountId]);
    return rows[0];
}

export async function createAccount(userId, account_number, type) {
    const [result] = await pool.query(
        `INSERT INTO bank_accounts (user_id, account_number, type)
         VALUES (?, ?, ?)`,
        [userId, account_number, type]
    );
    return result.insertId;
}
