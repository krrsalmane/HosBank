
import {
    getManagerRequests,
    getRequestForManager,
    updateRequestStatus,
    approveVirtualCardRequest
} from '../services/manager-request.service.js';

import {
    getManagerComplaints,
    getManagerComplaint,
    updateComplaintStatus
} from '../services/manager-complaint.service.js';

import {
    getClientInteractions
} from '../services/manager-interaction.service.js';

import {
    addRequestComment,
    addComplaintComment
} from '../services/manager-comment.service.js';


export async function showManagerDashboard(req, res) {
    res.render('manager/dashboard', {
        user: req.session.user
    });
}


export async function showManagerRequests(req, res) {
    try {
        const requests = await getManagerRequests(
            req.session.user.id
        );

        res.render('manager/requests', {
            user: req.session.user,
            requests: requests
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showManagerRequestDetails(req, res) {
    try {
        const request = await getRequestForManager(
            req.params.id,
            req.session.user.id
        );

        if (!request) {
            return res.status(404).send('Request not found');
        }

        res.render('manager/request-details', {
            user: req.session.user,
            request: request
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showManagerComplaints(req, res) {
    try {
        const complaints = await getManagerComplaints(
            req.session.user.id
        );

        res.render('manager/complaints', {
            user: req.session.user,
            complaints: complaints
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showManagerComplaintDetails(req, res) {
    try {
        const complaint = await getManagerComplaint(
            req.params.id,
            req.session.user.id
        );

        if (!complaint) {
            return res.status(404).send(
                'Complaint not found'
            );
        }

        res.render('manager/complaint-details', {
            user: req.session.user,
            complaint: complaint
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function changeComplaintStatus(req, res) {
    const allowedStatuses = [
        'OPEN',
        'IN_PROGRESS',
        'RESOLVED',
        'CLOSED'
    ];

    const {
        status
    } = req.body;

    if (!allowedStatuses.includes(status)) {
        return res.status(400).send(
            'Invalid complaint status'
        );
    }

    try {
        await updateComplaintStatus(
            req.params.id,
            req.session.user.id,
            status
        );

        res.redirect(
            `/manager/complaints/${req.params.id}`
        );

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function changeRequestStatus(req, res) {
    const {
        status
    } = req.body;

    const allowedStatuses = [
        'PENDING',
        'IN_PROGRESS',
        'APPROVED',
        'REJECTED',
        'COMPLETED'
    ];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).send(
            'Invalid status'
        );
    }

    try {

        if (status === 'APPROVED') {

            const request = await getRequestForManager(
                req.params.id,
                req.session.user.id
            );

            if (!request) {
                return res.status(404).send(
                    'Request not found'
                );
            }

            if (request.type === 'VIRTUAL_CARD') {

                await approveVirtualCardRequest(
                    req.params.id,
                    req.session.user.id
                );

            } else {

                await updateRequestStatus(
                    req.params.id,
                    req.session.user.id,
                    status
                );
            }

        } else {

            await updateRequestStatus(
                req.params.id,
                req.session.user.id,
                status
            );
        }

        res.redirect(
            `/manager/requests/${req.params.id}`
        );

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showManagerClients(req, res) {
    try {
        const clients = await getAssignedClients(
            req.session.user.id
        );

        res.render('manager/clients', {
            user: req.session.user,
            clients: clients
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showManagerClientDetails(req, res) {
    try {
        const client = await getAssignedClientById(
            req.params.id,
            req.session.user.id
        );

        if (!client) {
            return res.status(404).send(
                'Client not found'
            );
        }

        res.render('manager/client-details', {
            user: req.session.user,
            client: client
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function showClientInteractions(req, res) {
    try {
        const interactions = await getClientInteractions(
            req.params.id,
            req.session.user.id
        );

        res.render('manager/interactions', {
            user: req.session.user,
            interactions: interactions,
            clientId: req.params.id
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function addManagerRequestComment(req, res) {
    const { content } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).send('Comment cannot be empty');
    }

    try {
        await addRequestComment(
            req.params.id,
            req.session.user.id,
            content.trim()
        );

        res.redirect(
            `/manager/requests/${req.params.id}`
        );
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function addManagerComplaintComment(req, res) {
    const { content } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).send('Comment cannot be empty');
    }

    try {
        await addComplaintComment(
            req.params.id,
            req.session.user.id,
            content.trim()
        );

        res.redirect(
            `/manager/complaints/${req.params.id}`
        );
    } catch (error) {
        res.status(500).send(error.message);
    }
}