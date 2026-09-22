import { createDispute, findDisputesByUserId } from "../repositories/dispute.repository.js";

export async function fileDispute(userId, transactionId, reason) {
    if (!transactionId || !reason) {
        throw new Error("Transaction ID and reason are required");
    }
    const result = await createDispute({ userId, transactionId, reason });
    return { message: "Dispute filed successfully", disputeId: result.insertId };
}

export async function getUserDisputes(userId) {
    return await findDisputesByUserId(userId);
}