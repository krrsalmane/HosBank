import {pool} from '../config/database'

export async function getClientBeneficiaries(userId){

     const [rows] = await pool.query(
        ` SELECT *
        FRom beneficiaries
        where user_id = ?
        order by created_at desc `,
        [userId]
     );
     return rows;
}

export async function createBeneficiary(userId, name, accountNumber) {
    await pool.query(
        `INSERT INTO beneficiaries (user_id, name, accountNumber)
         VALUES (?, ?, ?)`,
        [userId, name, accountNumber]
    );
}

export async function getBeneficiaryById(id, userId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM beneficiaries
         WHERE id = ?
         AND user_id = ?`,
        [id, userId]
    );

    return rows[0];
}

export async function updateBeneficiary(
    id,
    userId,
    name,
    accountNumber
) {
    await pool.query(
        `UPDATE beneficiaries
         SET name = ?, accountNumber = ?
         WHERE id = ?
         AND user_id = ?`,
        [name, accountNumber, id, userId]
    );
}