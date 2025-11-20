const path = require("path");
const BillingAndCharges = require("../services/billingAndChargesServices");

const billingAndCharges = async (req, res) => {
    try {
        const {
            class_name,
            bed,
            nursing,
            doctor,
            rmo,
            bmw,
            total,
            deposit,
            created_by
        } = req.body;



        // Validate input
        if (!class_name || !bed || !nursing || !doctor || !rmo || !bmw || !total || !deposit) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are required',
            });
        }

        // Call service to insert subcategory
        const result = await BillingAndCharges.billinAndCharges(class_name, bed, nursing, doctor, rmo, bmw, total, deposit, created_by);
        return res.status(201).json({
            success: true,
            message: 'Add Billing and Charges successfully',
            data: result,
        });

    } catch (error) {
        console.error('Error adding billing and charges:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const GetAllBillingAndCharges = async (req, res) => {
    try {
        const categories = await BillingAndCharges.GetAllBillingAndCharges();
        return res.status(200).json({
            success: true,
            message: 'Billing and Charges data retrieved successfully',
            data: categories,
        });
    } catch (error) {
        console.error('Error fetching Billing and charges:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const UpdateBillingAndCharges = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from URL parameters
        const { class_name, bed, nursing, doctor, rmo, bmw, total, deposit } = req.body;
        // Validate inputs
        if (!id || !class_name ) {
            return res.status(400).json({
                success: false,
                message: "Billing ID and name are required.",
            });
        }

        // Call service function
        const result = await BillingAndCharges.updateBillingAndCharges(id, class_name, bed, nursing, doctor, rmo, bmw, total, deposit);
        return res.status(200).json({
            success: true,
            message: "Billing and charges updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating Billing and charges:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



const addDoctorBill = async (req, res) => {
    const { appointment_id, total_amount, user_id, chargesList } = req.body;

    try {
        // Validate required fields
        if (!appointment_id || !total_amount) {
            return res.status(400).json({
                status: false,
                message: "Appointment ID, Total Amount, and Payment Status are required",
            });
        }

        const chargesListJSON = JSON.stringify(chargesList);
        // Call service to insert data
        const newBill = await BillingAndCharges.addDoctorBill(
            appointment_id,
            total_amount,
            chargesListJSON,
            user_id
        );

        return res.status(201).json({
            status: true,
            message: "Billing and Charges added successfully",
            data: newBill, // Return inserted row
        });
    } catch (error) {
        console.error("Error adding doctor bill:", error);
        res.status(500).json({
            status: false,
            message: "Database error",
            error: error.message,
        });
    }
};



const updateBillById = async (req, res) => {
    try {
        const { bill_id } = req.query; // Extract id from URL parameters
        const { user_id, payment_status, payment_method } = req.body;
        const report = req.file ? path.basename(req.file.path) : null;
        // Validate inputs
        if (!bill_id || report === null) {
            return res.status(400).json({
                status: false,
                message: "Billing ID and report are required.",
            });
        }

        // Call service function
        const result = await BillingAndCharges.updateOPDBill(bill_id, user_id, payment_status, payment_method, report);
        return res.status(200).json({
            status: true,
            message: "Billing and charges updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating Billing and charges:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



module.exports = {
    billingAndCharges,
    GetAllBillingAndCharges,
    UpdateBillingAndCharges,
    addDoctorBill,
    updateBillById
}