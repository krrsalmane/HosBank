import {pool} from '../config/database.js'



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