import {pool} from '../config/database.js'



export async function getAllUsers(){
    const  [rows] = await pool.query(

         `SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            role,
            email_verified,
            active,
            created_at
         FROM users
         ORDER BY created_at DESC`
    )
    return rows
}

export async function getUserById(userId) {
    const [rows] = await pool.query(
        `SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            role,
            email_verified,
            active
         FROM users
         WHERE id = ?`,
        [userId]
    );

    return rows[0];
}


export async function createAdminUser(
    firstName,
    lastName,
    email,
    password,
    phone,
    role
) {
    await pool.query(
        `INSERT INTO users
        (
            first_name,
            last_name,
            email,
            password,
            phone,
            role
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            firstName,
            lastName,
            email,
            password,
            phone || null,
            role
        ]
    );
}

export async function updateUser(
    userId,
    firstName,
    lastName,
    email,
    phone,
    role
) {
    await pool.query(
        `UPDATE users
         SET
            first_name = ?,
            last_name = ?,
            email = ?,
            phone = ?,
            role = ?
         WHERE id = ?`,
        [
            firstName,
            lastName,
            email,
            phone || null,
            role,
            userId
        ]
    );
}

export async function updateUserStatus(userId, active) {
    await pool.query(
        `UPDATE users
         SET active = ?
         WHERE id = ?`,
        [active, userId]
    );
}


export async function getClients() {
    const [rows] = await pool.query(
        `SELECT
            id,
            first_name,
            last_name,
            email
         FROM users
         WHERE role = 'CLIENT'
         ORDER BY last_name, first_name`
    );

    return rows;
}

export async function getManagers() {
    const [rows] = await pool.query(
        `SELECT
            id,
            first_name,
            last_name,
            email
         FROM users
         WHERE role = 'CHARGE_CLIENT'
           AND active = TRUE
         ORDER BY last_name, first_name`
    );

    return rows;
}

export async function getClientAssignment(clientId) {
    const [rows] = await pool.query(
        `SELECT assigned_to
         FROM bank_requests
         WHERE user_id = ?
           AND assigned_to IS NOT NULL
         ORDER BY updated_at DESC
         LIMIT 1`,
        [clientId]
    );

    if (rows.length > 0) {
        return rows[0].assigned_to;
    }

    const [complaints] = await pool.query(
        `SELECT assigned_to
         FROM complaints
         WHERE user_id = ?
           AND assigned_to IS NOT NULL
         ORDER BY updated_at DESC
         LIMIT 1`,
        [clientId]
    );

    if (complaints.length > 0) {
        return complaints[0].assigned_to;
    }

    return null;
}

export async function assignClient(clientId, managerId) {
    await pool.query(
        `UPDATE bank_requests
         SET assigned_to = ?
         WHERE user_id = ?
           AND status IN ('PENDING', 'IN_PROGRESS')`,
        [managerId, clientId]
    );

    await pool.query(
        `UPDATE complaints
         SET assigned_to = ?
         WHERE user_id = ?
           AND status IN ('OPEN', 'IN_PROGRESS')`,
        [managerId, clientId]
    );
}



export async function getAllBankAccounts() {
    const [rows] = await pool.query(
        `SELECT
            bank_accounts.id,
            bank_accounts.account_number,
            bank_accounts.type,
            bank_accounts.balance,
            bank_accounts.status,
            bank_accounts.created_at,
            users.first_name,
            users.last_name,
            users.email
         FROM bank_accounts
         INNER JOIN users
            ON bank_accounts.user_id = users.id
         ORDER BY bank_accounts.created_at DESC`
    );

    return rows;
}

export async function updateBankAccountStatus(
    accountId,
    status
) {
    const allowedStatuses = [
        'ACTIVE',
        'BLOCKED',
        'CLOSED'
    ];

    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid account status');
    }

    await pool.query(
        `UPDATE bank_accounts
         SET status = ?
         WHERE id = ?`,
        [status, accountId]
    );
}