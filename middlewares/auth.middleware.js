export function authorize(...args) {
    const checkAccess = (roles) => (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/auth/login');
        }

        if (roles.length > 0 && !roles.includes(req.session.user.role)) {
            return res.status(403).send('You are not authorized to access this page.');
        }

        next();
    };

    const usedAsMiddleware =
        args.length >= 3 &&
        typeof args[0] === 'object' &&
        typeof args[1] === 'object' &&
        typeof args[2] === 'function';

    if (usedAsMiddleware) {
        return checkAccess([])(args[0], args[1], args[2]);
    }

    return checkAccess(args);
}
