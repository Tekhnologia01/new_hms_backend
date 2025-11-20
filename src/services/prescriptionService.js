const { query } = require("../utils/database");

//***************************AddPatient****************************//

const addPrescription = async (
    appointment_id,
    medicine_name,
    medicine_type,
    dosage,
    days,
    frequency,
    common_note,
    quantity,
    created_by
) => {
    try {
        return await query("CALL AddPrescription(?,?,?,?,?,?,?,?,?)", [
            appointment_id,
            medicine_name,
            medicine_type,
            dosage,
            days,
            frequency,
            common_note,
            quantity,
            created_by
        ]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const DeletePrescriptionById = async (prescription_id) => {
    try {
        const response = await query("DELETE FROM tbl_prescription WHERE prescription_id =?", [prescription_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
}

//***************************Update Prescription by prescription_id****************************//
const updatePrescriptionById = async (prescription_id, medicine_name, medicine_type, quantity, frequency, dosage, days, common_note) => {
    try {
        const sql = `UPDATE tbl_prescription SET medicine_name =?, medicine_type =?, medicine_quantity =?, frequency =?, dosage =?, days =?, common_note =? WHERE prescription_id =?`;
        const response = await query(sql, [medicine_name, medicine_type, quantity, frequency, dosage, days, common_note, prescription_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
}

const newIPDPrescription = async (
    ipd_id,
    medicine_name,
    medicine_type,
    dosage,
    days,
    frequency,
    common_note,
    quantity,
    created_by
) => {
    try {
        return await query("CALL AddIPDPrescription(?,?,?,?,?,?,?,?,?)", [
            ipd_id,
            medicine_name,
            medicine_type,
            dosage,
            days,
            frequency,
            common_note,
            quantity,
            created_by
        ]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetIPDPrescriptionByIpd = async (ipd_id) => {
    try {
        const result = await query("CALL GetIPDPrescription(?)", [ipd_id]);
        return result[0];
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        }
        throw new Error(error.message);
    }
};

const updateIpdPrescriptionById = async (prescription_id, medicine_name, medicine_type, quantity, frequency, dosage, days, common_note) => {
    try {
        const sql = `UPDATE tbl_ipd_prescription SET medicine_name =?, medicine_type =?, medicine_quantity =?, frequency =?, dosage =?, days =?, common_note =? WHERE ipd_prescription_id =?`;
        const response = await query(sql, [medicine_name, medicine_type, quantity, frequency, dosage, days, common_note, prescription_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
}

const DeletePrescriptionIpd = async (prescription_id) => {
    try {
        const response = await query("DELETE FROM tbl_ipd_prescription WHERE ipd_prescription_id =?", [prescription_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
}


const GetmedicineName = async () => {
    try {
        const result = await query("select * from tbl_medicine");
        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        }
        throw new Error(error.message);
    }
};


module.exports = {
    addPrescription,
    DeletePrescriptionById,
    updatePrescriptionById,
    newIPDPrescription,
    GetIPDPrescriptionByIpd,
    updateIpdPrescriptionById,
    DeletePrescriptionIpd,
    GetmedicineName
 };
