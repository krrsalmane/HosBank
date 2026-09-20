import pool from '../config/db.js';

export async function createTransfer(
    userId,
    accountId,
    beneficiaryId,
    amount,
    description
) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Check account belongs to client
        const [accounts] = await connection.query(
            `SELECT *
             FROM bank_accounts
             WHERE id = ?
             AND user_id = ?
             AND status = 'ACTIVE'`,
            [accountId, userId]
        );

        if (accounts.length === 0) {
            throw new Error('Account not found');
        }

        const account = accounts[0];

        // Check beneficiary belongs to client
        const [beneficiaries] = await connection.query(
            `SELECT *
             FROM beneficiaries
             WHERE id = ?
             AND user_id = ?`,
            [beneficiaryId, userId]
        );

        if (beneficiaries.length === 0) {
            throw new Error('Beneficiary not found');
        }

        // Check amount
        if (!amount || Number(amount) <= 0) {
            throw new Error('Invalid amount');
        }

        // Check balance
        if (Number(account.balance) < Number(amount)) {
            throw new Error('Insufficient balance');
        }

        // Create transfer
        const [transferResult] = await connection.query(
            `INSERT INTO transfers
             (sender_account_id, beneficiary_id, amount, description, status)
             VALUES (?, ?, ?, ?, 'COMPLETED')`,
            [
                accountId,
                beneficiaryId,
                amount,
                description || null
            ]
        );

        const transferId = transferResult.insertId;

        // Update balance
        await connection.query(
            `UPDATE bank_accounts
             SET balance = balance - ?
             WHERE id = ?`,
            [amount, accountId]
        );

        // Create transaction
        await connection.query(
            `INSERT INTO transactions
             (account_id, transfer_id, type, amount, description)
             VALUES (?, ?, 'TRANSFER', ?, ?)`,
            [
                accountId,
                transferId,
                amount,
                description || null
            ]
        );

        await connection.commit();

        return transferId;

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
}