import { updateAccountBalance, createTransaction } from "../repositories/transaction.repository.js";
import { findAccountById } from "../repositories/account.repository.js";

export async function transferMoney(senderAccountId, receiverAccountId, amount, userId) {
    let sender_account = await findAccountById(senderAccountId)
    if(!sender_account ) {
        throw new Error('sender acount not found')
    } 
    if(sender_account.iser_id !== userId) {
        throw new Error('unauthorized')
    }
    let receiver_account = await findAccountById(receiverAccountId);
    if(!sender_account ) {
        throw new Error('reveiver acount not found')
    } 
    if((sender_account.balance) < Number(amount)) {
        throw new Error('insuficient funds')
    } 
    newSenderBalance = Number(sender_account.balance) - Number(amount)
    newReceiverBalance = Number(receiver_account.balance) + Number(amount)

    updateAccountBalance(senderAccountId,newSenderBalance);
    updateAccountBalance(receiverAccountId,newReceiverBalance);

    await createTransaction(senderAccountId,receiverAccountId,amount)
    return { message: "Transfer successful" }
}