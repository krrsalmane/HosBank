import {getSystemStatistics ,findAllUsersWithRoles,deleteUserById,findAllAccountsWithUsers,deleteUserById, updateUserRoleInDb} from '../repositories/admin.repository.js';

export async function getAdminStats() {
    let res = await getAdminStats();
    return res
}

export async function getAllUsers() {
    let res = await findAllUsersWithRoles();
    return res;
}

export async function updateUserRole(userId, newRole) {
    if (!['CLIENT', 'CHARGE_CLIENT', 'ADMIN'].includes(newRole)) {
        throw new Error('Invalid role specified');
    }
    let res = await updateUserRoleInDb();
    return res
}

export async function deleteUser(userId) {
    let res = await deleteUserById(userId);
    return res;
}

export async function getAllAccounts() {
    let res = await findAllAccountsWithUsers();
    return res
}