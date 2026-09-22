import { createCard } from "../repositories/card.repository";
import { findAccountById } from "../repositories/account.repository";
import { createCard } from "../repositories/card.repository";

export async function  requestVirtualCard(accountId, userId, pin){
    let acc = await findAccountById(accountId)
    if(!acc) {
        throw new Error('account not found')
    }
    if(acc.user_id !== userId){
        throw new Error('unauthorized');
    }
    let cardNumber = '4' + Math.floor(100000000000000 + Math.random() * 900000000000000);
    let expiryDate = '2030-22-09';
    let hashedPin = await bcrypt.hash(pin,10);
    await createCard({accountId,cardNumber,cardType :'VIRTUAL',expiryDate,hashedPin});
    return {message : 'virtual card created',cardNumber};
}
