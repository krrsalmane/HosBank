import { getAccountTransactions, transferMoney ,} from "../services/transaction.service.js"

export async function handleTransfer(req, res) {
    let userId = req.session.user.userI
     let {senderAccountId,receiverAccountId,amount} = req.body;
     try {
        let res = await transferMoney(senderAccountId,receiverAccountId,amount,userId)
        return res.json(res)
     }catch(error){
        return res.status(400).json({ error: error.message })
     }
}

export async function showAccountTransactions(req,res) {
    let userId = req.session.user.id 
    let accountId = req.params.id
    try{
        let res = await getAccountTransactions(accountId,userId)
        return res.json(res)
    }catch(error) {
        return res.status(400).json({error:error/message});
    }
}