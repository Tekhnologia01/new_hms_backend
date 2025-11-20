const { query } = require("../utils/database");

const addAppointment = async (
    patient_id,
    review,
    patient_source,
    visited_type,
    appointment_time,
    date,
    doctor_id,
    appo_department_id,
    created_by,
    disease
) => {
    try {
        const result = await query(
            "CALL AddAppointment(?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
            [
                patient_id,
                review,
                patient_source,
                visited_type,
                appointment_time,
                date,
                doctor_id,
                appo_department_id,
                created_by,
                disease
            ]
        );




        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

const getDoctorAppointment = async (doctor_id, appointment_date) => {
    try {
        const result = await query(
            "CALL GetAppointmentsDoctorwise(?, ?)",
            [
                doctor_id,
                appointment_date
            ]
        );

        return result[0];
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

const getAppointmentWiseDoctorpatientDetails = async (appo_id) => {
    try {
        const [result] = await query("CALL GetAppointmentsDetails(?)", [appo_id]);
        return result[0];
    } catch (error) {
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error fet appointment data.");
        }
    }
};

const GetPrescriptionTestAppointwise = async (appo_id) => {
    try {
        const result = await query("CALL GetPrescriptionTest(?)", [appo_id]);
        data = { prescription: result[0], Test: result[1] };
        return data;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

const GetIpdAppointmentDetail = async (admited_id) => {
    try {
        const [result] = await query("CALL GetIpdAppointmentsDetails(?)", [admited_id]);
        return result[0];
    } catch (error) {
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error fet appointment data.");
        }
    }
};

const addExamination = async (
    uh_id,
    appointment_id,
    chief_complaints,
    personal_history,
    past_medical_history,
    present_medication,
    general_condition,
    pulse,
    blood_pressure,
    respiratory_rate,
    spo2,
    signs,
    respiratory_system,
    cardiovascular_system,
    central_nervous_system,
    per_abdomen,
    userId
) => {
    try {
        const result = await query(
            "CALL ExamineOPDPatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                uh_id,
                appointment_id,
                chief_complaints,
                personal_history,
                past_medical_history,
                present_medication,
                general_condition,
                pulse,
                blood_pressure,
                respiratory_rate,
                spo2,
                signs,
                respiratory_system,
                cardiovascular_system,
                central_nervous_system,
                per_abdomen,
                userId
            ]
        );
        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

const GetAppointmentdatewise = async (date) => {
    try {
        const result = await query("CALL GetCompletedAppointmentDatewise(?)", [date]);
        return result;
    } catch (error) {

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error  appointment data.");
        }
    }
};

const GetExamination = async (appointment_id) => {
    try {
        const sql = `SELECT * FROM tbl_opd_examination WHERE appointment_id = ${appointment_id}`
        const result = await query(sql);

        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error  appointment data.");
        }
    }
};

const updateExamination = async (
    opd_examination_id,
    appointment_id,
    chief_complaints,
    personal_history,
    past_medical_history,
    present_medication,
    general_condition,
    pulse,
    blood_pressure,
    respiratory_rate,
    spo2,
    signs,
    respiratory_system,
    cardiovascular_system,
    central_nervous_system,
    per_abdomen,
    userId
) => {
    try {
        const result = await query(
            "CALL UpdateOPDExamination(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                opd_examination_id,
                appointment_id,
                chief_complaints,
                personal_history,
                past_medical_history,
                present_medication,
                general_condition,
                pulse,
                blood_pressure,
                respiratory_rate,
                spo2,
                signs,
                respiratory_system,
                cardiovascular_system,
                central_nervous_system,
                per_abdomen,
                userId
            ]
        );
        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};
const GetAppointmentDetail = async (appointment_id) => {
    try {
        const result = await query("CALL GetAppointmentBillDetails(?)", [appointment_id]);
        return result[0][0];
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error  appointment data.");
        }
    }
};

const UpdateAdmitedDate = async (admited_id, admit_date) => {
    try {

        const result = await query(` CALL UpdateAdmitedDate(?,?)`, [admited_id, admit_date]);
       
        return result;
    } catch (error) {
        console.error("Database error:", error);
        console.log("uiuuu")
    }
};

module.exports = {
    addAppointment,
    getDoctorAppointment,
    getAppointmentWiseDoctorpatientDetails,
    GetPrescriptionTestAppointwise,
    addExamination,
    GetAppointmentdatewise,
    GetExamination,
    updateExamination,
    GetAppointmentDetail,
    GetIpdAppointmentDetail,
    UpdateAdmitedDate
};
