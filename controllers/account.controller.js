import { getUserAccounts , getAccountById } from "../services/account.service.js";
import { getAdminStats, getAllUsers, updateUserRole, deleteUser, getAllAccounts } from "../services/admin.service.js";

export async function showAccounts(req,res) {
    let userId = req.session.user.id
    let accounts = await getUserAccounts(userId);
    return res.json(accounts)
}

export async function showSingleAccount(req,res) {
    let userId = req.session.user.id  
    let accountId  = req.params.id
    try {
        let acc = await getAccountById(accountId,userId)
            return res.json(acc)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

export async function handleGetAdminStats(req, res) {
    try {
        let stats = await getAdminStats();
        return res.json(stats);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function handleGetAllUsers(req, res) {
    try {
        let users = await getAllUsers();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function handleUpdateUserRole(req, res) {
    let { userId, newRole } = req.body;
    try {
        let result = await updateUserRole(userId, newRole);
        return res.json({ message: "Role updated successfully", result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function handleDeleteUser(req, res) {
    let { id } = req.params;
    try {
        await deleteUser(id);
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function handleGetAllAccounts(req, res) {
    try {
        let accounts = await getAllAccounts();
        return res.json(accounts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}