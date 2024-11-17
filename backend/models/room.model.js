import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    roomType: { type: String, enum: ["AC", "Standard"], required: true },
    totalCapacity: { type: Number, required: true },
    currentCapacity: { type: Number, required: true },
    roomCharges: { type: Number, required: true },
    roomStatus: { type: String, enum: ["Available", "Occupied"], default: "Available" }
}, { timestamps: true });

export const Rooms = mongoose.model('Rooms', roomSchema);