import { Rooms } from "../models/room.model.js";

export async function getAvailableRooms(req, res) {
    try {
        // Fetch rooms with "Available" status
        const rooms = await Rooms.find({ roomStatus: "Available" });

        if (!rooms || rooms.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No rooms are available",
            });
        }

        // Return the available rooms
        res.status(200).json({
            success: true,
            rooms, // Directly return the array
        });
    } catch (error) {
        console.log("Error in rooms controller: " + error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export async function updateRoom(req, res) {
    const { roomId } = req.body;
    try {

        const room = await Rooms.findById(roomId);

        if (!room) {
            return res.status(400).json({
                success: false,
                message: "Room NOT Found"
            });
        }

        room.currentCapacity += 1;

        if (room.currentCapacity >= room.totalCapacity) {
            room.roomStatus = "Occupied";
        }

        await room.save();

        res.status(200).json({
            success: true,
            room
        });

    } catch (error) {
        console.log("Error in rooms controller: " + error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}