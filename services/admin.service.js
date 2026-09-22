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


export async function createAdminUser(
    firstName,
    lastName,
    email,
    password,
    phone,
    role
) {
    await pool.query(
        `INSERT INTO users
        (
            first_name,
            last_name,
            email,
            password,
            phone,
            role
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            firstName,
            lastName,
            email,
            password,
            phone || null,
            role
        ]
    );
}

export async function updateUser(
    userId,
    firstName,
    lastName,
    email,
    phone,
    role
) {
    await pool.query(
        `UPDATE users
         SET
            first_name = ?,
            last_name = ?,
            email = ?,
            phone = ?,
            role = ?
         WHERE id = ?`,
        [
            firstName,
            lastName,
            email,
            phone || null,
            role,
            userId
        ]
    );
}

export async function updateUserStatus(userId, active) {
    await pool.query(
        `UPDATE users
         SET active = ?
         WHERE id = ?`,
        [active, userId]
    );
}