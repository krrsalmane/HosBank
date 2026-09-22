import {
    getClientAccounts,
    getAccountById
}from '../services/account.service.js'

import {
    getBeneficiaryById,
    getClientBeneficiaries,
    updateBeneficiary,
    createBeneficiary,
    deleteBeneficiary
}from '../services/beneficiary.service.js'

import {
    getClientAccounts
} from '../services/account.service.js';

import {
    getClientBeneficiaries
} from '../services/beneficiary.service.js';

import {
    createTransfer
} from '../services/transfer.service.js';

import {
    getClientTransactions
} from '../services/transaction.service.js';


import {
    createRequest,
    getClientRequests,
    getRequestById
} from '../services/request.service.js';


import {
    getClientCards
}from '../services/card.service.js'

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

export async function showBeneficiaries(req, res){
    try{
        const beneficiaries = await getClientBeneficiaries(
            req.session.user.id
        )
        res.render('client/beneficiaries' ,{
            user: req.session.user,
            beneficiaries: beneficiaries
        })
    }catch(error){
        res.status(500).send(error.message)
    }
}

export function showAddBeneficiary(req ,res){
    res.render('client/add-beneficiary',{
        user: req.session.user
    })
}

export async function addBeneficiary(req, res) {
    const { name, accountNumber } = req.body;

    if (!name || !accountNumber) {
        return res.status(400).send('Name and account number are required');
    }

    if (name.length < 2) {
        return res.status(400).send('Name must contain at least 2 characters');
    }

    if (accountNumber.length < 5) {
        return res.status(400).send('Invalid account number');
    }

    try {
        await createBeneficiary(
            req.session.user.id,
            name,
            accountNumber
        );

        res.redirect('/client/beneficiaries');

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function showEditBeneficiary(req, res) {
    try {
        const beneficiary = await getBeneficiaryById(
            req.params.id,
            req.session.user.id
        );

        if (!beneficiary) {
            return res.status(404).send('Beneficiary not found');
        }

        res.render('client/edit-beneficiary', {
            user: req.session.user,
            beneficiary: beneficiary
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function editBeneficiary(req, res) {
    const { name, accountNumber } = req.body;

    if (!name || !accountNumber) {
        return res.status(400).send('Name and account number are required');
    }

    if (name.length < 2) {
        return res.status(400).send('Name must contain at least 2 characters');
    }

    if (accountNumber.length < 5) {
        return res.status(400).send('Invalid account number');
    }

    try {
        await updateBeneficiary(
            req.params.id,
            req.session.user.id,
            name,
            accountNumber
        );

        res.redirect('/client/beneficiaries');

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function removeBeneficiary(req, res) {
    try {
        await deleteBeneficiary(
            req.params.id,
            req.session.user.id
        );

        res.redirect('/client/beneficiaries');

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function showTransferForm(req, res) {
    try {
        const userId = req.session.user.id;

        const accounts = await getClientAccounts(userId);
        const beneficiaries = await getClientBeneficiaries(userId);

        res.render('client/transfer', {
            user: req.session.user,
            accounts: accounts,
            beneficiaries: beneficiaries
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showTransferConfirmation(req, res) {
    try {
        const userId = req.session.user.id;

        const accounts = await getClientAccounts(userId);
        const beneficiaries = await getClientBeneficiaries(userId);

        const account = accounts.find(
            account => account.id == req.body.accountId
        );

        const beneficiary = beneficiaries.find(
            beneficiary => beneficiary.id == req.body.beneficiaryId
        );

        if (!account) {
            return res.status(404).send('Account not found');
        }

        if (!beneficiary) {
            return res.status(404).send('Beneficiary not found');
        }

        res.render('client/transfer-confirmation', {
            user: req.session.user,
            account: account,
            beneficiary: beneficiary,
            amount: req.body.amount,
            description: req.body.description
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function makeTransfer(req, res) {
    try {
        const userId = req.session.user.id;

        const {
            accountId,
            beneficiaryId,
            amount,
            description
        } = req.body;

        await createTransfer(
            userId,
            accountId,
            beneficiaryId,
            amount,
            description
        );

        res.redirect('/client/transfers/history');

    } catch (error) {
        const accounts = await getClientAccounts(
            req.session.user.id
        );

        const beneficiaries = await getClientBeneficiaries(
            req.session.user.id
        );

        res.status(400).render('client/transfer', {
            user: req.session.user,
            accounts: accounts,
            beneficiaries: beneficiaries,
            error: error.message
        });
    }
}


export async function showTransactionHistory(req, res) {
    try {
        const transactions = await getClientTransactions(
            req.session.user.id
        );

        res.render('client/transaction-history', {
            user: req.session.user,
            transactions: transactions
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export function showRequests(req, res) {
    res.render('client/requests', {
        user: req.session.user
    });
}

export async function createClientRequest(req, res) {
    const {
        type,
        description
    } = req.body;

    const allowedTypes = [
        'RIB',
        'SAVINGS_ACCOUNT',
        'VIRTUAL_CARD',
        'PIN_RECALCULATION',
        'CARD_OPPOSITION'
    ];

    if (!allowedTypes.includes(type)) {
        return res.status(400).send('Invalid request type');
    }

    try {
        await createRequest(
            req.session.user.id,
            type,
            description
        );

        res.redirect('/client/requests');

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showClientRequests(req, res) {
    try {
        const requests = await getClientRequests(
            req.session.user.id
        );

        res.render('client/requests', {
            user: req.session.user,
            requests: requests
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showClientRequestDetails(req, res) {
    try {
        const request = await getRequestById(
            req.params.id,
            req.session.user.id
        );

        if (!request) {
            return res.status(404).send('Request not found');
        }

        res.render('client/request-details', {
            user: req.session.user,
            request: request
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}





//===============
//     CARDS
//=============

export async function showClientCards(req, res) {
    try {
        const cards = await getClientCards(
            req.session.user.id
        );

        res.render('client/cards', {
            user: req.session.user,
            cards: cards
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}



export async function showCardOpposition(req ,res){

    try{
        const cards = await getClientCards(
            req.session.user.id
        )
        res.render('client/card-opposition' ,{
            user: req.session.user,
            cards: cards
        })
    }catch (error){
        res.status(500).send(error.message)
    }
}

export async function requestCardOpposition(req ,res){
    const {
        cardId,
        description
    }= req.body;

    try {
        const cards = await getClientCards(
            req.session.user.id
        )

        const card = cards.find(
            card =>card.id == cardId
        )

        if(!card){
            return res.status(404).send('Card not found')
        }

        await createRequest(
            req.session.user.id,
            'CARD_OPPOSITION',
            `Card ID: ${cardId}. ${description} `
        )
        res.redirect('/client/requests')
    }catch (error) 
    {

        res.status(500).send(error.message)
    }
}