const roombedServices = require("../services/roombedService");

//***************************AddRoom****************************//

const addRoom = async (req, res) => {
    try {
        const { userId } = req.params;
        const { room_type, room_name, max_bed } = req.body;
        if (!room_type || !room_name) {
            return res.status(400).json({ status: false, message: "Room type  and Room Name are required" });
        }
        await roombedServices.addRoom(room_type, room_name, userId, max_bed);
        res.status(201).json({ status: true, message: "Room added successfully" });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//***************************GetRoom****************************//

const getRoom = async (req, res) => {
    try {


        const room = await roombedServices.getRoom();

        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Room get succefully" });
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************DeleteRoom****************************//

const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        // Validate departmentId
        if (!roomId || isNaN(roomId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing room" });
        }
        // Attempt to delete department
        const result = await roombedServices.deleteRoom(roomId);

        res.status(200).json({ status: true, message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************UpdateRoom****************************//

const updateRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { room_type_id, room_name, max_bed } = req.body;

        // Validate input
        if (!roomId || isNaN(roomId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing roomId" });
        }
        if (!room_type_id || !room_name) {
            return res.status(400).json({ status: false, message: " Room Name  is required" });
        }

        // Attempt to update department
        const result = await roombedServices.updateRoom(room_type_id, room_name, roomId, parseInt(max_bed));

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Room not found or no changes made" });
        }

        res.status(200).json({ status: true, message: "Room updated successfully" });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************AddBed****************************//

const addBed = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bed_name, room_id } = req.body;
        if (!bed_name || !room_id) {
            return res.status(400).json({ status: false, message: "RoomId and Bed Name are required" });
        }
        await roombedServices.addBed(bed_name, room_id, userId);
        res.status(201).json({ status: true, message: "Bed added successfully" });
    } catch (error) {

            res.status(500).json({ status: false, message: error });
 
            
    }
};

//***************************DeleteBed****************************//

const deleteBed = async (req, res) => {
    try {
        const { bedId } = req.params;
        // Validate departmentId
        if (!bedId || isNaN(bedId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing BedId" });
        }
        // Attempt to delete department
        const result = await roombedServices.deleteBed(bedId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "BedId not found or already deleted" });
        }
        res.status(200).json({ status: true, message: "Bed deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************DeleteBed****************************//

const getRoomType = async (req, res) => {
    try {
        const room = await roombedServices.getRoomType();
        // If no departments found, return false status
        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room_type found" });
        }

        res.status(200).json({ status: true, data: room, message: "Room Type get succefully" });
    } catch (error) {
        console.error("Error fetching room type:", error);
        res.status(500).json({ status: false, message: error || "Internal Server Error" });
    }
};

//***************************GetBedRoom****************************//

const getBedAndRoomRoomTypewise = async (req, res) => {

    const { room_type_id, page, limit } = req.query;
    try {
        const room = await roombedServices.getBedAndRoomRoomTypewise(room_type_id, page, limit);
        // If no departments found, return false status
        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Room get succefully" });
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************GetBedRoom****************************//
const getBedInfo = async (req, res) => {
    const page = req.query.page || null;
    const limit = req.query.limit || null;

    try {
        const room = await roombedServices.getBedInfo(page, limit);

        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Bed retrieved successfully" });
    } catch (error) {
        console.error("Error fetching bed:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const getRoomTypewise = async (req, res) => {
    const { id } = req.query;
    try {
        const room = await roombedServices.getRoomTypewise(id);
        // If no departments found, return false status
        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Bed get succefully" });
    } catch (error) {
        console.error("Error fetching bed:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const getBed = async (req, res) => {
    try {
        const room = await roombedServices.getBed();
        // If no departments found, return false status
        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Bed get succefully" });
    } catch (error) {
        console.error("Error fetching bed:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const getAvailableBeds = async (req, res) => {
    const { room_type, admit_date } = req.query;

    try {
        const room = await roombedServices.getAvailableBedRommType(room_type, admit_date);
        // If no departments found, return false status
        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No bed found" });
        }

        res.status(200).json({ status: true, data: room, message: "Bed get succefully" });
    } catch (error) {
        console.error("Error fetching bed:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const getRoomBedCount = async (req, res) => {
    try {
        const room = await roombedServices.getRoomBedCount();

        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Count get succefully" });
    } catch (error) {
        console.error("Error fetching count:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const UpdateBed = async (req, res) => {
    try {

        const { bed_id, bed_name, room_id } = req.body;


        if (!bed_id || isNaN(bed_id)) {
            return res.status(400).json({ status: false, message: "Invalid or missing bedId" });
        }
        if (!bed_name) {
            return res.status(400).json({ status: false, message: " Bed Name  is required" });
        }
        if (!room_id) {
            return res.status(400).json({ status: false, message: " Room is required" });
        }

        // Attempt to update department
        const result = await roombedServices.updateBed(bed_id, bed_name, room_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Room not found or no changes made" });
        }

        res.status(200).json({ status: true, message: "Room updated successfully" });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const getAvailableBedsRoomwise = async (req, res) => {
    try {

        const { roomId } = req.query
        const room = await roombedServices.getAvailableBedsRoomwise(roomId);
        // If no departments found, return false status
        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Bed get succefully" });
    } catch (error) {
        console.error("Error fetching bed:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const ChangeBed = async (req, res) => {
    try {
        const { admited_id, ipd_id, bed_id, start_date } = req.body;


        if (!admited_id || !ipd_id || !bed_id || !start_date) {
            return res.status(400).json({ status: false, message: "Provied all required" });
        }
        await roombedServices.ChangeBed(admited_id, ipd_id, bed_id, start_date);
        res.status(201).json({ status: true, message: "Change Bed successfully" });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getRoomDetails = async (req, res) => {

    const {admited_id } = req.query;
    try {

        if(!admited_id){
            return res.status(400).json({status: false,  message: "admited_id not found" })
        }
        const room = await roombedServices.getRoomDetails(admited_id);
        // If no departments found, return false status
        if (!room || room.length === 0) {
            return res.status(404).json({ status: true, data: [], message: "No room found" });
        }

        res.status(200).json({ status: true, data: room, message: "Room get succefully" });
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const updateRoomDate = async (req, res) => {
    try {
        const { start_date,end_date,bed_booking_id } = req.body;


        if ( !bed_booking_id  || !start_date) {
            return res.status(400).json({ status: false, message: "Provied all required" });
        }
        await roombedServices.updateRoomDate(start_date,end_date,bed_booking_id);
        res.status(201).json({ status: true, message: "Change Bed successfully" });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateAdmitedPaientBed = async (req, res) => {
    try {
        const { admited_id,bed_id,bed_booking_id } = req.body;


        if ( !bed_booking_id  || !admited_id || !bed_id) {
            return res.status(400).json({ status: false, message: "Provied all required" });
        }
        await roombedServices.updateAdmitedPaientBed(admited_id,bed_id,bed_booking_id);
        res.status(201).json({ status: true, message: "Change Bed successfully" });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ error: "Internal Server Error" ,message:error.message});
    }
};

const deleteAdmitedPaitentBed = async (req, res) => {
    try {
        const { admited_id, bed_booking_id } = req.body;

        if (!admited_id || !bed_booking_id) {
            return res.status(400).json({
                status: false,
                message: "Please provide admited_id and bed_booking_id"
            });
        }

       const response= await roombedServices.deleteAdmitedPaitentBed(admited_id, bed_booking_id);
        res.status(200).json({ status: true, message: "Bed deleted successfully" });
    } catch (error) {
        console.error("Error deleting bed:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



module.exports = {
    addRoom,
    getRoom,
    deleteRoom,
    updateRoom,
    addBed,
    deleteBed,
    getRoomType,
    getBedAndRoomRoomTypewise,
    getBedInfo,
    getRoomTypewise,
    getBed,
    getRoomBedCount,
    UpdateBed,
    getAvailableBeds,
    getAvailableBedsRoomwise,
    updateAdmitedPaientBed,
    deleteAdmitedPaitentBed,
    ChangeBed,
    getRoomDetails,
    updateRoomDate
};
