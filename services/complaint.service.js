import {pool} from '../config/database.js'



export async function createComplaint(
    userId,
    subject,
    description
) {
    await pool.query(
        `INSERT INTO complaints
        (user_id, subject, description)
        VALUES (?, ?, ?)`,
        [
            userId,
            subject,
            description
        ]
    );
}

export async function getClientComplaints(userId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM complaints
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
}

export async function getComplaintById(
    complaintId,
    userId
) {
    const [rows] = await pool.query(
        `SELECT *
         FROM complaints
         WHERE id = ?
         AND user_id = ?`,
        [
            complaintId,
            userId
        ]
    );

    return rows[0];
}
