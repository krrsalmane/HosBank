import { getAccountTransactions, transferMoney ,} from "../services/transaction.service.js"

export async function handleTransfer(req, res) {
    let userId = req.session.user.id
     let {senderAccountId,receiverAccountId,amount} = req.body;
     try {
        let result = await transferMoney(senderAccountId,receiverAccountId,amount,userId)
        return res.json(result)
     }catch(error){
        return res.status(400).json({ error: error.message })
     }
}

export async function showAccountTransactions(req,res) {
    let userId = req.session.user.id 
    let accountId = req.params.id
    try{
        let result = await getAccountTransactions(accountId,userId)
        return res.json(result)
    }catch(error) {
        return res.status(400).json({error:error.message});
    }
}