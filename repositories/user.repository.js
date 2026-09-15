import { pool } from '../config/database.js';

export async function findUserByEmail(email) {
    let [row] =  await pool.query(`SELECT FROM users WHERE email = ?`,[email])
    if (row === 0) {
        return null;
    }
    return row[0];
}

export async function createUser(firstName,lastName,email,password,phone,role) {
    const [result] = await pool.query(`INSERT INTO users (first_name, last_name, email, password, phone, role)VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, password, phone, role]
    );
    return result.insertId;
}