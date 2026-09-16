import 'dotenv/config'
import express from 'express';
import session from 'express-session';
import authRouter from './routes/auth.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';

const app = express()
app.set("view engine","ejs");
app.set('views','views')
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
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

app.get('/', (req, res) =>{
    res.render('home')
})

app.use((req,res) => {
    res.status(404).render('errors/404')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

