import {pool} from '../config/database.js'
import { getClientAssignment } from './admin.service.js';



export async function createComplaint(
    userId,
    subject,
    description
) {
    const assignedTo = await getClientAssignment(userId);

    await pool.query(
        `INSERT INTO complaints
        (user_id, subject, description, assigned_to)
        VALUES (?, ?, ?, ?)`,
        [
            userId,
            subject,
            description,
            assignedTo
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
