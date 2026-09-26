import { pool } from '../config/database.js';

export async function getClientBeneficiaries(userId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM beneficiaries
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows.map(row => ({
        ...row,
        account_number: row.account_number || row.accountNumber,
        accountNumber: row.accountNumber || row.account_number
    }));
}

export async function createBeneficiary(userId, name, account_number) {
    try {
        await pool.query(
            `INSERT INTO beneficiaries (user_id, name, account_number)
             VALUES (?, ?, ?)`,
            [userId, name, account_number]
        );
    } catch (err) {
        if (err.code === 'ER_BAD_FIELD_ERROR' || err.errno === 1054) {
            await pool.query(
                `INSERT INTO beneficiaries (user_id, name, accountNumber)
                 VALUES (?, ?, ?)`,
                [userId, name, account_number]
            );
        } else {
            throw err;
        }
    }
}

export async function getBeneficiaryById(id, userId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM beneficiaries
         WHERE id = ?
         AND user_id = ?`,
        [id, userId]
    );

    if (!rows[0]) return null;

    return {
        ...rows[0],
        account_number: rows[0].account_number || rows[0].accountNumber,
        accountNumber: rows[0].accountNumber || rows[0].account_number
    };
}

export async function updateBeneficiary(id, userId, name, account_number) {
    try {
        await pool.query(
            `UPDATE beneficiaries
             SET name = ?, account_number = ?
             WHERE id = ?
             AND user_id = ?`,
            [name, account_number, id, userId]
        );
    } catch (err) {
        if (err.code === 'ER_BAD_FIELD_ERROR' || err.errno === 1054) {
            await pool.query(
                `UPDATE beneficiaries
                 SET name = ?, accountNumber = ?
                 WHERE id = ?
                 AND user_id = ?`,
                [name, account_number, id, userId]
            );
        } else {
            throw err;
        }
    }
}

export async function deleteBeneficiary(id, userId) {
    await pool.query(
        `DELETE FROM beneficiaries
         WHERE id = ?
         AND user_id = ?`,
        [id, userId]
    );
}