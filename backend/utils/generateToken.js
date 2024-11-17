import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env.config.js";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

    res.cookie("jwt-hostel", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    });

    return token;
};