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
        res.status(400).send(error.message);
    }
}