import {pool} from '../config/database.js'





export async function getClientCards(userId){
    const [rows] = await pool.query(
       ` select 
         cards.* ,
         bank_accounts.account_number
         from cards 
         inner join bank_accounts
         on cards.account_id = bank_accounts.id
         where cards.user_id = ?
         order by cards.created_at desc
       ` ,
       [userId]
    )
    return rows
}