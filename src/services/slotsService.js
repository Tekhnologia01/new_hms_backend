const { query } = require("../utils/database");

const getDoctorDaySlots = async (doctor_id, appointment_date, appointment_day) => {
    try {
        const response = await query("CALL GetDoctorsAvailableSlot(?, ?, ?)", [doctor_id, appointment_date, appointment_day]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

module.exports = { getDoctorDaySlots };