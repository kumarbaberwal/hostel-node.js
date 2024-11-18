import express from "express";
import { getAvailableRooms, updateRoom} from "../controllers/rooms.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getAvailableRooms", getAvailableRooms);
router.patch("/updateRoom", updateRoom);
// router.post("/logout", logout);

export default router;