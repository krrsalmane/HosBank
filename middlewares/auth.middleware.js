

export function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    next();
}

export function authorize(...roles){
    return (req,res,next)=>{
        if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    if(!roles.includes(req.session.user.role)){
        return res.status(403).render('error',{
             message: 'You are not authorized to access this page.'
        })
    }
    next()
    }
}

