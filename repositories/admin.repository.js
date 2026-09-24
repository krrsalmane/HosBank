import { pool } from "../config/database.js";

export async function getSystemStatistics(){
    let [usersCount] = await pool.query('SELECT COUNT(*) as totalUsers FROM users');
    let [accountsCount] = await pool.query('SELECT COUNT(*) as totalAccounts, SUM(balance) as totalBalance FROM bank_accounts');
    let [transactionsCount] = await pool.query('SELECT COUNT(*) as totalTransactions FROM transactions');
    return {
        totalUsers: usersCount[0].totalUsers,
        totalAccounts: accountsCount[0].totalAccounts,
        totalBalance: accountsCount[0].totalBalance || 0,
        totalTransactions: transactionsCount[0].totalTransactions
    };
}

export async function findAllUsersWithRoles() {
    let [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users');
    return rows;
}

export async function updateUserRoleInDb(userId, newRole) {
    let [res] = await pool.query('UPDATE users SET role = ? WHERE id = ?',[newRole,userId]);
    return res
}

export async function deleteUserById(userId) {
    let [res] = await pool.query('DELETE FROM users WHERE id = ?',[userId]);
    return res;
}

export async function findAllAccountsWithUsers() {
    let [res] = await pool.query('SELECT bank_accounts.*, users.name as owner_name FROM bank_accounts JOIN users ON bank_accounts.user_id = users.id');
    return res;
}