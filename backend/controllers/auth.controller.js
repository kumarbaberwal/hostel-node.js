import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";

export async function signup(req, res) {
    try {
        const { userName, firstName, lastName, email, password, phoneNumber, blockNumber, roomNumber } = req.body;

        const requiredFields = ["userName", "firstName", "lastName", "email", "password", "phoneNumber", "blockNumber", "roomNumber"];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            blockNumber,
            roomNumber,
        });

        const token = generateTokenAndSetCookie(newUser._id, res);

        await newUser.save();

        res.status(201).json({
            success: true,
            User: {
                ...newUser._doc,
                token: token

            },
        });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}