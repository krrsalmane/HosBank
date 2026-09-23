import {pool} from '../config/database.js';

import {
    createVirtualCard
} from './card.service.js'

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


export async function approveVirtualCardRequest(
    requestId,
    managerId
) {
    const [rows] = await pool.query(
        `SELECT
            bank_requests.*,
            bank_accounts.id AS account_id
         FROM bank_requests
         INNER JOIN bank_accounts
            ON bank_accounts.user_id = bank_requests.user_id
         WHERE bank_requests.id = ?
         AND bank_requests.assigned_to = ?
         AND bank_requests.type = 'VIRTUAL_CARD'`,
        [
            requestId,
            managerId
        ]
    );

    if (rows.length === 0) {
        throw new Error('Request not found');
    }

    const request = rows[0];

    await createVirtualCard(
        request.user_id,
        request.account_id
    );

    await pool.query(
        `UPDATE bank_requests
         SET status = 'COMPLETED'
         WHERE id = ?`,
        [requestId]
    );
}