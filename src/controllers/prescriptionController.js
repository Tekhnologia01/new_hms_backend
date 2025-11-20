const prescriptionService = require("../services/prescriptionService");

const addPrescription = async (req, res) => {
    try {
        const { appointment_id, created_by } = req.query;
        const {
            medicine_name,
            medicine_type,
            frequency,
            quantity,
            dosage,
            days,
            common_note
        } = req.body;

        if (!appointment_id || !medicine_name || !quantity || !frequency || !days) {
            return res.status(400).json({ status: false, message: "All fields are required for prescription" });
        }

        // Insert prescriptions in parallel
        prescriptionService.addPrescription(
            appointment_id,
            medicine_name,
            medicine_type,
            dosage,
            days,
            frequency,
            common_note,
            quantity,
            created_by
        )

        res.status(201).json({ status: true, message: "Prescription(s) added successfully" });

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

//***************************Delete Prescription****************************//

const DeletePrescription = async (req, res) => {
    try {
        const { prescription_id } = req.query;
        const result = await prescriptionService.DeletePrescriptionById(prescription_id);

        res.status(200).json({
            status: true,
            message: "Prescription data removed successfully",
            data: result.data ? result : []
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};

//***************************Update Prescription****************************//
const UpdatePrescription = (req, res) => {
    try {
        const { prescription_id } = req.query;
        const { medicine_name, medicine_type, quantity, frequency, dosage, days, common_note } = req.body;
        if (!prescription_id || !medicine_name || !quantity || !frequency || !days) {
            return res.status(400).json({ status: false, message: "All fields are required for prescription update" });
        }
        const result = prescriptionService.updatePrescriptionById(parseInt(prescription_id), medicine_name, medicine_type, quantity, frequency, dosage, days, common_note);
        res.status(200).json({ status: true, message: "Prescription updated successfully", data: result });
    } catch (error) {
        console.error("Error updating prescription:", error);
        res.status(500).json({ status: false, error: error.message });
    }
}

const addIPDPrescription = async (req, res) => {
    try {
        const { ipd_id, created_by } = req.query;
        const {
            medicine_name,
            medicine_type,
            frequency,
            quantity,
            dosage,
            days,
            common_note
        } = req.body;

        if (!ipd_id || !medicine_name || !quantity || !frequency || !days) {
            return res.status(400).json({ status: false, message: "All fields are required for prescription" });
        }

        // Insert prescriptions in parallel
        const result = prescriptionService.newIPDPrescription(
            ipd_id,
            medicine_name,
            medicine_type,
            dosage,
            days,
            frequency,
            common_note,
            quantity,
            created_by
        )

        res.status(201).json({ status: true, message: "Prescription(s) added successfully" });

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getIpdPrescription = async (req, res) => {
  try {
    const { ipd_id } = req.query;
    const result = await prescriptionService.GetIPDPrescriptionByIpd(ipd_id);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UpdateIpdPrescription = (req, res) => {
    try {
        const { prescription_id } = req.query;
        const { medicine_name, medicine_type, quantity, frequency, dosage, days, common_note } = req.body;
        if (!prescription_id || !medicine_name || !quantity || !frequency || !days) {
            return res.status(400).json({ status: false, message: "All fields are required for prescription update" });
        }
        const result = prescriptionService.updateIpdPrescriptionById(parseInt(prescription_id), medicine_name, medicine_type, quantity, frequency, dosage, days, common_note);
        res.status(200).json({ status: true, message: "Prescription updated successfully", data: result });
    } catch (error) {
        console.error("Error updating prescription:", error);
        res.status(500).json({ status: false, error: error.message });
    }
}

const DeleteIpdPrescription = async (req, res) => {
    try {
        const { prescription_id } = req.query;
        const result = await prescriptionService.DeletePrescriptionIpd(prescription_id);

        res.status(200).json({
            status: true,
            message: "Prescription data removed successfully",
            data: result.data ? result : []
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};




const GetmedicineName = async (req, res) => {
  try {

    const result = await prescriptionService.GetmedicineName();
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
    addPrescription,
    DeletePrescription,
    UpdatePrescription,
    addIPDPrescription,
    getIpdPrescription,
    UpdateIpdPrescription,
    DeleteIpdPrescription,
    GetmedicineName
 };
