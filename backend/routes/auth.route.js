import express from "express";
import { signup, login, logout, authCheck } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authCheck", auth, authCheck);

export default router;