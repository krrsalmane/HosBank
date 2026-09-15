import 'dotenv/config'
import express from 'express';
import {pool} from './config/database.js';

const connection = await pool.getConnection()
const app = express()
app.set("view engine","ejs");
app.set('views','views')
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/register' ,(req,res) =>{
    res.render('auth/register')
})
app.get('/login' , (req,res) =>{
    res.render('')
})

app.use((req,res) => {
    res.status(404).render('errors/404')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

