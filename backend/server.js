import express from 'express';
import cookieParser from 'cookie-parser';
import { ENV_VARS } from './config/env.config.js';
import { connectDB } from './config/database.config.js';
import authRoutes  from './routes/auth.route.js';
import roomRoutes  from './routes/room.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = ENV_VARS.PORT;

// app.use('/', (req, res)=>{
//     res.json({
//         message: "Hello Kumar"
//     });
// });

app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});