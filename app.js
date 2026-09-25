import 'dotenv/config'
import express from 'express';
import session from 'express-session';
import authRouter from './routes/auth.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import accountROuter from './routes/account.routes.js';
import transactionRouter from './routes/transaction.routes.js';
import { authorize } from './middlewares/auth.middleware.js';
import cardRouter from './routes/card.route.js';
import disputeRouter from './routes/dispute.routes.js';
import verificationRouter from './routes/verification.router.js';
import clientRoutes from './routes/client.routes.js';
import managerRoutes from './routes/manager.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
const port = Number(process.env.PORT) || 3000;
const sessionSecret = process.env.SESSION_SECRET || 'dev-session-secret';

app.set("view engine","ejs");
app.set('views','views')
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));
app.use('/auth',authRouter);
app.use('/dashboard',dashboardRouter);
app.use('/accounts',authorize,accountROuter);
app.use('/transfers',authorize,transactionRouter)
app.use('/cards', authorize, cardRouter);
app.use('/disputes', authorize, disputeRouter);

app.get('/', (req, res) =>{
    res.render('home')
})

app.use('/verification' ,verificationRouter);


app.use('/client' , clientRoutes);

app.use('/manager' ,managerRoutes);

app.use('/admin' , adminRoutes)

app.use((req,res) => {
    res.status(404).render('errors/404')
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;
