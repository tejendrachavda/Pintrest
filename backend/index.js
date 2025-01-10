import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { connectDB } from './db/connetion.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

connectDB();

// app.get()
// importing routes
import userRoutes from './routes/user.route.js';
import pinRoutes from './routes/pin.route.js';

// using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

app.listen(process.env.port || 4000 , () =>{
    console.log(`server is running on port ${process.env.port}`)
})