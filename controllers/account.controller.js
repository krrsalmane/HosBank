import { getUserAccounts } from "../services/account.service.js";
import { getAccountById } from "../services/account.service.js";

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