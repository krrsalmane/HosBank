import { pool } from '../config/database.js';

export async function getClientInteractions(
    clientId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            interactions.*,
            users.first_name,
            users.last_name
         FROM interactions
         INNER JOIN users
            ON interactions.employee_id = users.id
         WHERE interactions.client_id = ?
           AND interactions.employee_id = ?
         ORDER BY interactions.created_at DESC`,
        [
            clientId,
            managerId
        ]
    );

    return rows;
}