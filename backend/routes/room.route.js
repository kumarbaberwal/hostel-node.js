import express from "express";
import { getAvailableRooms, } from "../controllers/rooms.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getAvailableRooms", getAvailableRooms);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;