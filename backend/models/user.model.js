import { type } from "express/lib/response";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    blockNumber: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'hostler'],
        default: 'hostler'
    }
}, { timestamps: true });


export const User = mongoose.model("User", userSchema);