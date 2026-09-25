import { fileDispute, getUserDisputes } from "../services/dispute.service.js";

export async function handleCreateDispute(req, res) {
    let userId = req.session.user.id;
    let { transactionId, reason } = req.body;

    try {
        let result = await fileDispute(userId, transactionId, reason);
        return res.json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function handleGetUserDisputes(req, res) {
    let userId = req.session.user.id;

    try {
        let disputes = await getUserDisputes(userId);
        return res.json(disputes);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}