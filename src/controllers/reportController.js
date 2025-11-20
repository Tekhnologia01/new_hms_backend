const { response } = require("express");
const reportService = require("../services/reportService"); // Ensure this service handles database operations

const addReport = async (req, res) => {
    try {

        const { report_appo_id, report_test_id } = req.body;

        const photo = req.files?.['report_photo']?.[0]?.path || null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        
        // Validate required fields
        if (!report_appo_id || !report_test_id ) {
            return res.status(400).json({
                status: false,
                message: "Appointment ID, Test ID, and User ID are required",
            });
        }
        await reportService.addReport(report_appo_id, report_test_id, extractedPhotoPath);

        res.status(201).json({ status: true, message: "Report added successfully" });
    } catch (error) {
        console.error("Error adding report:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const AddIpdReport = async (req, res) => {
    try {

        const { report_adm_id, report_labtest_id } = req.body;

        const photo = req.files?.['report_photo']?.[0]?.path || null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        
        // Validate required fields
        if (!report_adm_id || !report_labtest_id ) {
            return res.status(400).json({
                status: false,
                message: "Admited ID, LabTest ID",
            });
        }
        await reportService.AddIpdReport(report_adm_id, report_labtest_id, extractedPhotoPath);

        res.status(201).json({ status: true, message: "Report added successfully" });
    } catch (error) {
        console.error("Error adding report:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const UpdateIpdReport = async (req, res) => {
    try {
        const { report_labtest_id } = req.body;
        const photo = req.files?.['report_photo']?.[0]?.path || null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        // Validate required fields
        if (!report_labtest_id ) {
            return res.status(400).json({
                status: false,
                message: "LabTest ID",
            });
        }
        await reportService.UpdateIpdReport( report_labtest_id, extractedPhotoPath);
        res.status(201).json({ status: true, message: "Report updated successfully" });
    } catch (error) {
        console.error("Error adding report:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



const UpdateOpdReport = async (req, res) => {
    try {
        const { report_labtest_id } = req.body;
        const photo = req.files?.['report_photo']?.[0]?.path || null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        // Validate required fields
        if (!report_labtest_id ) {
            return res.status(400).json({
                status: false,
                message: "LabTest ID",
            });
        }
        await reportService.UpdateOpdReport( report_labtest_id, extractedPhotoPath);
        res.status(201).json({ status: true, message: "Report updated successfully" });
    } catch (error) {
        console.error("Error adding report:", response);
        res.status(500).json({ status: false, message: "Labtest Id not found" });
    }
};


module.exports = { addReport ,AddIpdReport,UpdateIpdReport,UpdateOpdReport};
