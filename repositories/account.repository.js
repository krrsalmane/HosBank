import { pool } from "../config/database"

export async function findAccountsByUserId(userId) {
    let [res] = await pool.query('SELECT * FROM babk_accounts WHERE user_id = ?',[userId]) 
    return res;
}

export async function findAccountById(accountId){
    let [acc] = await pool.query('SELECT * FROM bank_accounts WHERE id = ?',[accountId]);
    return acc;
}