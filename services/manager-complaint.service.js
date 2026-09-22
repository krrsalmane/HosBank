import pool from '../config/database.js';

export async function getManagerComplaints(managerId) {
    const [rows] = await pool.query(
        `SELECT
            complaints.*,
            users.first_name,
            users.last_name,
            users.email
         FROM complaints
         INNER JOIN users
            ON complaints.user_id = users.id
         WHERE complaints.assigned_to = ?
         ORDER BY complaints.created_at DESC`,
        [managerId]
    );

    return rows;
}

export async function getManagerComplaint(
    complaintId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            complaints.*,
            users.first_name,
            users.last_name,
            users.email
         FROM complaints
         INNER JOIN users
            ON complaints.user_id = users.id
         WHERE complaints.id = ?
         AND complaints.assigned_to = ?`,
        [
            complaintId,
            managerId
        ]
    );

    return rows[0];
}

export async function updateComplaintStatus(
    complaintId,
    managerId,
    status
) {
    await pool.query(
        `UPDATE complaints
         SET status = ?
         WHERE id = ?
         AND assigned_to = ?`,
        [
            status,
            complaintId,
            managerId
        ]
    );
}