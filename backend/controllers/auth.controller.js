import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

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

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true, 
            user: {
                ...user._doc,
                token: token
            } 
        });

    } catch (error) {
        console.log("Error in login controller: " + error.message);
        req.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export async function logout(req, res) {
    try {
        res.clearCookie("jwt-hostel");
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        console.log("Error in logout controller: " + error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export async function authCheck(req, res) {
    try {
        console.log("req.user", req.user);
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.log("Error in authChechController: " + error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}