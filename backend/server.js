import express from 'express';
import cookieParser from 'cookie-parser';
import { ENV_VARS } from './config/env.config.js';
import { connectDB } from './config/database.config.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = ENV_VARS.PORT;

app.use('/', (req, res)=>{
    res.json({
        message: "Hello Kumar"
    });
});

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});