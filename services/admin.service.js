import {pool} from '../config/database.js'



export async function getAllUsers(){
    const  [rows] = await pool.query(

         `SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            role,
            email_verified,
            active,
            created_at
         FROM users
         ORDER BY created_at DESC`
    )
    return rows
}

export async function getUserById(userId) {
    const [rows] = await pool.query(
        `SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            role,
            email_verified,
            active
         FROM users
         WHERE id = ?`,
        [userId]
    );

    return rows[0];
}