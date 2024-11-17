import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/env.config.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                sucess: false,
                message: "Unauthorized - No Token Provided"
            });
        }

        const decoded = jwt.verify(token.split(" ")[1], ENV_VARS.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                sucess: false,
                message: "Unauthorized - Invalid Token"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "User Not Found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in Auth Middleware: " + error.message);
        res.status(500).json({
            sucess: false,
            message: "Internal Server Error"
        });
    }
};