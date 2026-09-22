import { json } from "express";
import { requestVirtualCard } from "../services/card.service.js";
export async function handleRequestVirtualCard(req, res) {
    let userId = req.session.user.id;
    let {accountId,pin} = req.body;
    try{
        let res = await requestVirtualCard(accountId,userId,pin)
        return res.json(res)
    } catch(error){
        return res.status(400).json({error:error.message});
    }
}