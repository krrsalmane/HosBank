import { pool } from '../config/database.js';

export async function addRequestComment(
    requestId,
    managerId,
    content
) {
    const [requests] = await pool.query(
        `SELECT id
         FROM bank_requests
         WHERE id = ?
           AND assigned_to = ?`,
        [
            requestId,
            managerId
        ]
    );

    if (requests.length === 0) {
        throw new Error('Request not found');
    }

    await pool.query(
        `INSERT INTO comments
            (user_id, request_id, content)
         VALUES (?, ?, ?)`,
        [
            managerId,
            requestId,
            content
        ]
    );
}

export async function addComplaintComment(
    complaintId,
    managerId,
    content
) {
    const [complaints] = await pool.query(
        `SELECT id
         FROM complaints
         WHERE id = ?
           AND assigned_to = ?`,
        [
            complaintId,
            managerId
        ]
    );

    if (complaints.length === 0) {
        throw new Error('Complaint not found');
    }

    await pool.query(
        `INSERT INTO comments
            (user_id, complaint_id, content)
         VALUES (?, ?, ?)`,
        [
            managerId,
            complaintId,
            content
        ]
    );
}

export async function getRequestComments(
    requestId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            comments.*,
            users.first_name,
            users.last_name
         FROM comments
         INNER JOIN users
            ON comments.user_id = users.id
         INNER JOIN bank_requests
            ON comments.request_id = bank_requests.id
         WHERE comments.request_id = ?
           AND bank_requests.assigned_to = ?
         ORDER BY comments.created_at ASC`,
        [
            requestId,
            managerId
        ]
    );

    return rows;
}

export async function getComplaintComments(
    complaintId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            comments.*,
            users.first_name,
            users.last_name
         FROM comments
         INNER JOIN users
            ON comments.user_id = users.id
         INNER JOIN complaints
            ON comments.complaint_id = complaints.id
         WHERE comments.complaint_id = ?
           AND complaints.assigned_to = ?
         ORDER BY comments.created_at ASC`,
        [
            complaintId,
            managerId
        ]
    );

    return rows;
}