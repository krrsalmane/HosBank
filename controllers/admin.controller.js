import {pool} from '../config/database.js'

import bcrypt from 'bcrypt';

import {
    getAllUsers,
    getUserById,
    createAdminUser,
    updateUser,
    updateUserStatus,
    getClients,
    getManagers,
    getClientAssignment,
    assignClient,
    getAllBankAccounts,
    updateBankAccountStatus
} from '../services/admin.service.js';


export async function showAdminDashboard(req ,res){

    try{

        const [users] = await pool.query(
             `SELECT COUNT(*) AS total
             FROM users`
        )

        const [clients] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM users
             WHERE role = 'CLIENT'`
        )

         const [managers] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM users
             WHERE role = 'CHARGE_CLIENT'`
        );

        const [accounts] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM bank_accounts`
        );

        const [requests] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM bank_requests
             WHERE status IN ('PENDING', 'IN_PROGRESS')`
        );

        const [complaints] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM complaints
             WHERE status IN ('OPEN', 'IN_PROGRESS')`
        );

        res.render('admin/dashboard', {
            user: req.session.user,
            stats: {
                users: users[0].total,
                clients: clients[0].total,
                managers: managers[0].total,
                accounts: accounts[0].total,
                requests: requests[0].total,
                complaints: complaints[0].total
            }
        });

    }catch (error){
        res.status(500).send(error.message)
    }
    
}


export async function showUsers( req, res){
    try{
        const users = await getAllUsers()
        
        res.render('admin/users' ,{
        user: req.session.user,
        users: users
    })
}catch (error){
    res.status(500).send(error.message)
}
}

export function showCreateUser(req ,res){
    res.render('admin/create-user' ,{
        user:req.session.user,
        error: null
    })
}

export async function createUser(req, res) {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        role
    } = req.body;

    const allowedRoles = [
        'CLIENT',
        'CHARGE_CLIENT',
        'ADMIN'
    ];

    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !allowedRoles.includes(role)
    ) {
        return res.status(400).render('admin/create-user', {
            user: req.session.user,
            error: 'Please fill in all required fields.'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await createAdminUser(
            firstName,
            lastName,
            email,
            hashedPassword,
            phone,
            role
        );

        res.redirect('/admin/users');

    } catch (error) {
        res.status(400).render('admin/create-user', {
            user: req.session.user,
            error: error.message
        });
    }
}


export async function showEditUser(req, res) {
    try {
        const selectedUser = await getUserById(req.params.id);

        if (!selectedUser) {
            return res.status(404).send('User not found');
        }

        res.render('admin/edit-user', {
            user: req.session.user,
            selectedUser: selectedUser,
            error: null
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function editUser(req, res) {
    const {
        firstName,
        lastName,
        email,
        phone,
        role
    } = req.body;

    const allowedRoles = [
        'CLIENT',
        'CHARGE_CLIENT',
        'ADMIN'
    ];

    if (
        !firstName ||
        !lastName ||
        !email ||
        !allowedRoles.includes(role)
    ) {
        return res.status(400).send('Invalid user data');
    }

    try {
        await updateUser(
            req.params.id,
            firstName,
            lastName,
            email,
            phone,
            role
        );

        res.redirect('/admin/users');

    } catch (error) {
        res.status(400).send(error.message);
    }
}


export async function changeUserStatus(req, res) {
    const active = req.body.active === 'true';

    try {
        await updateUserStatus(
            req.params.id,
            active
        );

        res.redirect('/admin/users');

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showAssignments(req, res) {
    try {
        const clients = await getClients();
        const managers = await getManagers();

        for (const client of clients) {
            client.assigned_to = await getClientAssignment(client.id);
        }

        res.render('admin/assignments', {
            user: req.session.user,
            clients: clients,
            managers: managers
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function assignClientToManager(req, res) {
    const { clientId, managerId } = req.body;

    if (!clientId || !managerId) {
        return res.status(400).send('Client and manager are required');
    }

    try {
        await assignClient(clientId, managerId);

        res.redirect('/admin/assignments');

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showAccounts(req, res) {
    try {
        const accounts = await getAllBankAccounts();

        res.render('admin/accounts', {
            user: req.session.user,
            accounts: accounts
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function changeAccountStatus(req, res) {
    const { status } = req.body;

    try {
        await updateBankAccountStatus(
            req.params.id,
            status
        );

        res.redirect('/admin/accounts');

    } catch (error) {
        res.status(400).send(error.message);
    }
}