import {
    getClientAccounts,
    getAccountById
}from '../services/account.service.js'



export function showClientDashboard( req , res ){
    res.render('client/dashboard', {
        user: req.session.user
    });
}