import {findAccountsByUserId} from  '../repositories/account.repository.js'
import { findAccountById } from '../repositories/account.repository.js';

export async function getUserAccounts(userId) {
    let res = await findAccountsByUserId(userId);
    return res;
}

export async function getAccountById(accountId, userId){
        let acc = await findAccountById(accountId)
        if(!acc) {
            throw new Error('account not found')
        }  
        if(acc.user_id !== userId){
            throw new Error('unauthorized');
        }  
        return acc;
}
