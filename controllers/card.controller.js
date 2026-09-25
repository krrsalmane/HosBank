import { requestVirtualCard } from "../services/card.service.js";
export async function handleRequestVirtualCard(req, res) {
    let userId = req.session.user.id;
    let {accountId,pin} = req.body;
    try{
        let result = await requestVirtualCard(accountId,userId,pin)
        return res.json(result)
    } catch(error){
        return res.status(400).json({error:error.message});
    }
}