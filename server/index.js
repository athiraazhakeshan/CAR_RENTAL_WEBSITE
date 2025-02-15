// // import express from 'express'
// // import dotenv from 'dotenv';
// // import { connectDB } from './config/db.js'
// // import { apiRouter } from './routes/index.js';
// // import cookieParser from 'cookie-parser';
// // import cors from "cors";
// // import bodyParser from 'body-parser';



// // const app = express()
// // const port = 3000
// // dotenv.config();
// // connectDB();
// // app.use(bodyParser.json());
// // app.use(cookieParser());
// // app.get('/',(req,res)=>{
// //     res.send('hello world');
// // })

// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json())
// // app.use(cookieParser())
// // app.use(cors({
// //     origin:["http://localhost:5173","https://car-rental-website-front-end.vercel.app"],
// //     credentials:true
// // }));
// // app.use('/api',apiRouter)
// // app.listen(port,()=>{
// //     console.log(`example app listening on port ${port}`)
// // })

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
    origin:["https://car-rental-website-frontend-three.vercel.app","http://localhost:5173"],
    credentials:true,
    methods:['GET',"POST","PUT","DELETE","OPTIONS","PATCH"]
}));

// List of allowed origins
// const allowedOrigins = [
   
//     "https://car-rental-website-frontend-three.vercel.app" 
// ];

// // CORS Middleware with Dynamic Origin Handling
// app.use(cors({
//     origin: (origin, callback) => {
//         // Allow requests from the allowed origins or if no origin is provided (e.g., server-to-server requests)
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);  // Allow request
//         } else {
//             callback(new Error('Not allowed by CORS'));  // Block request
//         }
//     },
//     credentials: true,  // Allow cookies and credentials
// }));

// // CORS Headers Setup (Optional if you want to customize more headers)
// app.use((req, res, next) => {
//     // const origin=req.headers.origin;
//     // if(allowedOrigins.includes(origin)){
//     //     res.header("Acess-Control-Allow-Origin",origin);
//     // }
//     res.header('Access-Control-Allow-Origin', 'https://car-rental-website-frontend-three.vercel.app');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     if(req.method=="OPTIONS"){
//         return res.status(204).end();
//     }
//     next();
// });

// Routes
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use('/api', apiRouter);

// Start server
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Set timeout to 5 minutes (300000 milliseconds)
server.setTimeout(300000);


