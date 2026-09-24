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