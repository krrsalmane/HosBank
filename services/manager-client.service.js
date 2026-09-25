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
         WHERE users.role = 'CLIENT'
           AND users.id IN (
                SELECT user_id
                FROM bank_requests
                WHERE assigned_to = ?
                UNION
                SELECT user_id
                FROM complaints
                WHERE assigned_to = ?
                UNION
                SELECT client_id
                FROM interactions
                WHERE employee_id = ?
                  AND type = 'ASSIGNMENT'
           )
         ORDER BY users.last_name, users.first_name`,
        [managerId, managerId, managerId]
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
         WHERE users.id = ?
           AND users.role = 'CLIENT'
           AND users.id IN (
                SELECT user_id
                FROM bank_requests
                WHERE assigned_to = ?
                UNION
                SELECT user_id
                FROM complaints
                WHERE assigned_to = ?
                UNION
                SELECT client_id
                FROM interactions
                WHERE employee_id = ?
                  AND type = 'ASSIGNMENT'
           )`,
        [clientId, managerId, managerId, managerId]
    );

    return rows[0];
}
