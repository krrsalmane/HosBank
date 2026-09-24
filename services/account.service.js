import {pool} from '../config/database.js'

export async function getClientAccounts(userId) {
    const [rows] = await pool.query(
        `SELECT *
        FROM bank_accounts
        WHERE    user_id = ?` ,
        [userId]
    );
    return rows;
}

export async function getAccountById(accountId , userId){
    const [rows] = await pool.query(
        `SELECT *
        FROM bank_accounts
        WHERE id = ? `,
        [accountId ,userId]

    );
    return rows[0]
}