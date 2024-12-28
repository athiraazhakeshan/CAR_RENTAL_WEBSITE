// import express from 'express'
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js'
// import { apiRouter } from './routes/index.js';
// import cookieParser from 'cookie-parser';
// import cors from "cors";
// import bodyParser from 'body-parser';



// const app = express()
// const port = 3000
// dotenv.config();
// connectDB();
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.get('/',(req,res)=>{
//     res.send('hello world');
// })

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin:["http://localhost:5173","https://car-rental-website-front-end.vercel.app"],
//     credentials:true
// }));
// app.use('/api',apiRouter)
// app.listen(port,()=>{
//     console.log(`example app listening on port ${port}`)
// })

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { apiRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://car-rental-website-front-end.vercel.app"],
    credentials: true
}));

// CORS Middleware Verification
app.use((req, res, next) => {
   // res.header('Access-Control-Allow-Origin', 'https://car-rental-website-front-end.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use('/api', apiRouter);

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

export default app;
