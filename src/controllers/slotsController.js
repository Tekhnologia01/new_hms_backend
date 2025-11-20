const slotsService = require("../services/slotsService");
const { getEpochTime } = require("../utils/epochTime");
const { getDayId } = require("../utils/util");


//***************************GetReceptionist****************************//
const getDoctorsSlots = async (req, res) => {
    const {doctor_id, appointment_date} = req.query;
    try {
        const result = await slotsService.getDoctorDaySlots(doctor_id, getEpochTime(appointment_date), getDayId(appointment_date));
        
        res.status(200).json({
            status: true,
            data: result.length ? result[0] : [], // Return empty array if no data
            message: result.length ? "Slots retrieved successfully" : "No slots found",
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};



module.exports = { getDoctorsSlots };