import {
    getClientAccounts,
    getAccountById
}from '../services/account.service.js'



export function showClientDashboard( req , res ){
    res.render('client/dashboard', {
        user: req.session.user
    });
}

export async function showAccounts(req ,res){
    try{
        const accounts = await getClientAccounts(
            req.session.user.id
        );
        res.render('client/accounts' , {
            user: req.session.user,
            accounts: accounts
        });
    }catch (error){
        res.status(500).send(error.message)
    }
}

export async function showAccountDetails(req ,res){
    try{
        const account = await getAccountById(
            req.params.id,
            req.session.user.id
        );
        if(!account){
            return res.status(400).send('Account not found')
        }
        res.render('client/account-details' ,{
            user: req.session.user ,
            account : account
        });
    }catch (error) {
        res.status(500).send(error.message)
    }
}