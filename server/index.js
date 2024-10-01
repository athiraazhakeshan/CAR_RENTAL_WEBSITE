import express from 'express'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
const app = express()
const port = 3000
dotenv.config();
connectDB();

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})