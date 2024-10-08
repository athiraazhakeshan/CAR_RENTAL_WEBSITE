import express from 'express'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import { apiRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express()
const port = 3000
dotenv.config();
connectDB();


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use(express.json())
app.use(cookieParser())

app.use('/api',apiRouter)

app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})