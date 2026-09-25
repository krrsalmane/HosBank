import {pool} from '../config/database.js';
import { getClientAssignment } from './admin.service.js';

export async function createRequest(
    userId,
    type,
    description
) {
    const assignedTo = await getClientAssignment(userId);

    await pool.query(
        `INSERT INTO bank_requests
        (user_id, type, description, assigned_to)
        VALUES (?, ?, ?, ?)`,
        [userId, type, description, assignedTo]
    );
}

export async function getClientRequests(userId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM bank_requests
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
}

export async function getRequestById(requestId, userId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM bank_requests
         WHERE id = ?
         AND user_id = ?`,
        [requestId, userId]
    );

    return rows[0];
}