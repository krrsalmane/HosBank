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

