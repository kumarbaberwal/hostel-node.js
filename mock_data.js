import mongoose from "mongoose";
import { Rooms } from "./backend/models/room.model.js";
import mockdata from "./mock_rooms_data.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        // Establish MongoDB connection
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected: " + conn.connection.host);

        // Check for existing data to prevent duplication
        const existingData = await Rooms.find();
        if (existingData.length === 0) {
            const collection = await Rooms.insertMany(mockdata);
            console.log("Collection Created with Mock Data: ", collection);
        } else {
            console.log("Rooms Collection Already Contains Data");
        }
    } catch (error) {
        console.error("Error Connecting to MongoDB: ", error.message);
        process.exit(1);
    } finally {
        mongoose.connection.close(); // Close connection after operation
    }
};

connectDB();
