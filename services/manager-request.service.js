import pool from '../config/database.js';

export async function getManagerRequests(managerId) {
    const [rows] = await pool.query(
        `SELECT
            bank_requests.*,
            users.first_name,
            users.last_name,
            users.email
         FROM bank_requests
         INNER JOIN users
            ON bank_requests.user_id = users.id
         WHERE bank_requests.assigned_to = ?
         ORDER BY bank_requests.created_at DESC`,
        [managerId]
    );

    return rows;
}

export async function getRequestForManager(
    requestId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            bank_requests.*,
            users.first_name,
            users.last_name,
            users.email
         FROM bank_requests
         INNER JOIN users
            ON bank_requests.user_id = users.id
         WHERE bank_requests.id = ?
         AND bank_requests.assigned_to = ?`,
        [requestId, managerId]
    );

    return rows[0];
}

export async function updateRequestStatus(
    requestId,
    managerId,
    status
) {
    await pool.query(
        `UPDATE bank_requests
         SET status = ?
         WHERE id = ?
         AND assigned_to = ?`,
        [status, requestId, managerId]
    );
}