import {findAccountsByUserId} from  '../repositories/account.repository.js'
import { findAccountById } from '../repositories/account.repository.js';
import { createAccount as insertAccount } from '../repositories/account.repository.js';
import { randomBytes } from 'node:crypto';

export async function getUserAccounts(userId) {
    let res = await findAccountsByUserId(userId);
    return res;
}

export async function openAccount(userId, type) {
    if (!['CHECKING', 'SAVINGS'].includes(type)) {
        throw new Error('Choose a checking or savings account');
    }

    // A unique database constraint protects account numbers from collisions.
    const accountNumber = randomBytes(8).toString('hex').toUpperCase();
    return insertAccount(userId, accountNumber, type);
}


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
        WHERE id = ? AND user_id = ?`,
        [accountId ,userId]

    );
    return rows[0]
}
