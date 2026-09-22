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


export async function createVirtualCard(
    userId,
    accountId
) {
    const cardNumber =
        '4' +
        Math.floor(
            100000000000000 + Math.random() * 900000000000000
        ).toString();

    const expirationDate = new Date();

    expirationDate.setFullYear(
        expirationDate.getFullYear() + 4
    );

    await pool.query(
        `INSERT INTO cards
        (
            user_id,
            account_id,
            card_number,
            type,
            status,
            expiration_date
        )
        VALUES (?, ?, ?, 'VIRTUAL', 'ACTIVE', ?)`,
        [
            userId,
            accountId,
            cardNumber,
            expirationDate
        ]
    );
}