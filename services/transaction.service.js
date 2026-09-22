import { updateAccountBalance, createTransaction } from "../repositories/transaction.repository.js";
import { findAccountById } from "../repositories/account.repository.js";
import { findTransactionsByAccountId } from "../repositories/transaction.repository.js";

export async function transferMoney(senderAccountId, receiverAccountId, amount, userId) {
    if((Number(amount) <= 0 || isNaN(amount))){
        throw new Error('change the amount');
    }
    if(Number(senderAccountId) == Number(receiverAccountId)) {
        throw new Error('cannot transfer money to the same account')
    }
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
    if(Number(sender_account.balance) < Number(amount)) {
        throw new Error('insuficient funds')
    } 
    newSenderBalance = Number(sender_account.balance) - Number(amount)
    newReceiverBalance = Number(receiver_account.balance) + Number(amount)

    await updateAccountBalance(senderAccountId,newSenderBalance);
    await updateAccountBalance(receiverAccountId,newReceiverBalance);

    await createTransaction(senderAccountId,receiverAccountId,amount)
    return { message: "Transfer successful" }
}

export async function getAccountTransactions(accountId, userId) {
    let acc = await findAccountById(accountId)
    if(!acc){
            throw new Error('account not found');
        }
        if(acc.user.id !== userId) {
            throw new Error('unauthorized')
        }
        let res = await findTransactionsByAccountId(accountId)
        return res
}