export function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'ADMIN') {
        return res.status(403).send('Access denied');
    }
    next();
}
