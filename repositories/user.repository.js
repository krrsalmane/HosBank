import { pool } from '../config/database.js';

export async function findUserByEmail(email) {
    let [row] =  await pool.query(`SELECT * FROM users WHERE email = ?`,[email]);
    if (row.length === 0) {
        return null;
    }
    return row[0];
}

export async function findUserById(id) {
    const [rows] = await pool.query('SELECT id, first_name, last_name, email, phone, role, email_verified, active FROM users WHERE id = ?',[id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

export async function createUser(firstName,lastName,email,password,phone,role) {
    const [result] = await pool.query(`INSERT INTO users (first_name, last_name, email, password, phone, role)VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, password, phone, role]
    );
    return result.insertId;
}

export async function markUserEmailAsVerified(userId) {
    let [result] = await pool.query(`UPDATE users SET email_verified = TRUE WHERE id = ?`,[userId]);
    return result.affectedRows > 0;
}