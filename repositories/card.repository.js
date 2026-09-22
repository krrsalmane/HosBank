import { pool } from '../config/database.js';

export async function createCard({accountId, cardNumber, cardType, expiryDate, hashedPin}) {
    let [res] = await pool.query('INSERT INTO cards (account_id, card_number, card_type, expiry_date, pin, status) VALUES (?, ?, ?, ?, ?, ACTIVE)',[accountId, cardNumber, cardType, expiryDate, hashedPin]);
    return res;
}

export async function findCardsByAccountId(accountId) {
    let [res] = await pool.query('SELECT * FROM  cards WHERE account_id = ?',[accountId]);
    return res;
}

export async function findCardById(cardId) {
    let [res] = await pool.query('SELECT * FROM cards WHERE id = ?',[cardId]);
    return res[0];
}