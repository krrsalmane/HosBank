import { pool } from '../config/database.js';


export async function getAssignedClients(managerId) {
    const [rows] = await pool.query(
        `SELECT
            users.id,
            users.first_name,
            users.last_name,
            users.email,
            users.phone,
            users.active
         FROM users
         INNER JOIN bank_requests
            ON bank_requests.user_id = users.id
         WHERE users.role = 'CLIENT'
           AND bank_requests.assigned_to = ?
         GROUP BY
            users.id,
            users.first_name,
            users.last_name,
            users.email,
            users.phone,
            users.active
         ORDER BY users.last_name, users.first_name`,
        [managerId]
    );

    return rows;
}


export async function getAssignedClientById(
    clientId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            users.id,
            users.first_name,
            users.last_name,
            users.email,
            users.phone,
            users.active
         FROM users
         INNER JOIN bank_requests
            ON bank_requests.user_id = users.id
         WHERE users.id = ?
           AND users.role = 'CLIENT'
           AND bank_requests.assigned_to = ?
         GROUP BY
            users.id,
            users.first_name,
            users.last_name,
            users.email,
            users.phone,
            users.active`,
        [clientId, managerId]
    );

    return rows[0];
}
