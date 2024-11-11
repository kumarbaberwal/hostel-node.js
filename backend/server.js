import express from 'express';
import { ENV_VARS } from './config/env.config.js';


const app = express();
app.use(express.json());

const PORT = ENV_VARS.PORT;

app.use('/', (req, res)=>{
    res.json({
        message: "Hello Kumar"
    });
});

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" + PORT);
});