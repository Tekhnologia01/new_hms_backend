const { query } = require("../utils/database");

//***************************AddRoom****************************//

const addRoom = async (room_type, room_name, userId, max_bed) => {
    try {
        return await query("CALL AddRoom(?,?,?)", [room_type, room_name, max_bed]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetRoom****************************//

const  getRoom = async () => {
    try {
        const response = await query("CALL GetRooms()");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************DeleteRoom****************************//

const deleteRoom = async (room_id) => {
    try {
        const response = await query("CALL DeleteRoom(?)", [room_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************UpdateRoom****************************//

const updateRoom = async (room_type_id, room_name, roomId, max_bed) => {
    try {

        const response = await query("CALL UpdateRoom(?,?,?,?)", [room_type_id, room_name, roomId, max_bed]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************AddBed****************************//

const addBed = async (bed_name, room_id, userId) => {
    try {
        return await query("CALL AddBed(?,?,?)", [bed_name, room_id, userId]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************DeleteBed****************************//

const deleteBed = async (bed_id) => {
    try {
        const response = await query("CALL DeleteBed(?)", [bed_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetRoom****************************//

const getRoomType = async () => {
    try {
        const response = await query("select * from tbl_room_type ");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetRoom****************************//

const getBedAndRoomRoomTypewise = async (roomtype_id, page, limit) => {
    try {
        const response = await query("CALL GetBedRoomTypeWise(?,?,?)", [roomtype_id, page, limit]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getBedInfo = async (page, limit) => {
    try {
        const response = await query("CALL GetBedInfo(?,?)", [page, limit]);
        const data = {
            data: response[0],
            pagination: response[1]
        }
        return data;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const getRoomTypewise = async (id) => {
    try {
        const response = await query("select * from tbl_room where room_type_id = ? AND room_status = 1", [id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const getBed = async () => {
    try {
        const response = await query("select * from tbl_bed ");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getAvailableBedRommType = async (room_type, admit_date) => {
    try {
        const response = await query("CALL GetAvailableBedByRoomType(?, ?)", [room_type, admit_date]);
        return response[0];
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
}

const getRoomBedCount = async () => {
    try {
        const [response] = await query("Call GetRoomBedCount()");

        const result = response?.reduce((acc, item) => {
            // Convert metric names to camelCase for consistency
            const key = item?.metric?.replace(/\s+/g, '')?.charAt(0)?.toLowerCase() + item?.metric?.replace(/\s+/g, '')?.slice(1);
            acc[key] = item?.count;
            return acc;
        }, {});
        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const updateBed = async (bed_id, bed_name, room_id,) => {
    try {

        const response = await query("UPDATE tbl_bed SET bed_name = ?, room_id= ?  WHERE bed_id = ?", [bed_name, room_id, bed_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getAvailableBedsRoomwise = async (roomId) => {
    try {
        const response = await query("select * from tbl_bed WHERE room_id =  ?", [roomId]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const ChangeBed= async (admited_id, ipd_id, bed_id, start_date) => {
    try {
        return await query("CALL ChangeBed(?,?,?,?)", [admited_id, ipd_id, bed_id,start_date]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const getRoomDetails = async (admited_id) => { 
    try {
        const [response] = await query("call GetRoomDetailsdata(?)",[admited_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const updateRoomDate= async (start_date,end_date,bed_booking_id) => {
    try {
        return await query("CALL UpdateRoomChangeDate(?,?,?)", [start_date,end_date,bed_booking_id]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const updateAdmitedPaientBed= async (admited_id,bed_id,bed_booking_id) => {
    try {
        return await query("CALL UpdateAdmitedPaitentBed(?,?,?)", [bed_id,admited_id,bed_booking_id]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const deleteAdmitedPaitentBed= async (admited_id,bed_booking_id) => {
    try {
        return await query("CALL DeleteAdmitedPaitentBed(?,?)", [admited_id,bed_booking_id]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


module.exports = { addRoom, getRoom, deleteRoom, updateRoom, addBed, deleteBed, getRoomType, getBedAndRoomRoomTypewise, getBedInfo, getRoomTypewise, getBed, getRoomBedCount, updateBed, getAvailableBedRommType,getAvailableBedsRoomwise ,ChangeBed,getRoomDetails,updateRoomDate, updateAdmitedPaientBed, deleteAdmitedPaitentBed};

