const { query } = require("../utils/database");

const billinAndCharges = async (class_name, bed, nursing, doctor, rmo, bmw, total, deposit,
    created_by) => {
    try {
        const result = await query('CALL AddBillingAndCharges(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            class_name,
            bed,
            nursing,
            doctor,
            rmo,
            bmw,
            total,
            deposit,
            created_by
        ]);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(error.message);
    }
};
const GetAllBillingAndCharges = async () => {
    try {
        const BillingAndCharges = await query('CALL GetAllBillingAndCharges()');
        return BillingAndCharges;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};


const updateBillingAndCharges = async (id, class_name, bed, nursing, doctor, rmo, bmw, total, deposit) => {
    try {
        // Call the stored procedure
        const result = await query(`CALL UpdateBillingAndCharges(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            id,
            class_name,
            bed,
            nursing,
            doctor,
            rmo,
            bmw,
            total,
            deposit
        ]);

        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};






const addDoctorBill = async (appointment_id,
    total_amount,
    chargesList, // Array of charges objects
    user_id) => {
    try {
        const result = await query('CALL AddDoctorBill(?, ?, ?, ?)', [appointment_id, user_id, total_amount, chargesList]);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

const updateOPDBill = async (bill_id, user_id, payment_status, payment_method, report) => {
    try {

        // Call the stored procedure
        const result = await query(`CALL UpdateBilling(?, ?, ?, ?, ?)`, [
            bill_id,
            payment_status,
            payment_method,
            report,
            user_id
        ]);

        return result[0][0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

module.exports = {
    billinAndCharges,
    GetAllBillingAndCharges,
    updateBillingAndCharges,
    addDoctorBill,
    updateOPDBill,
}