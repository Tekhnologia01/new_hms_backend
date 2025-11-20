const { query } = require("../utils/database");

const addReport = async (report_appo_id, report_test_id, report_photo) => {
    try {
        const response = await query("CALL AddReport(?,?,?)", [report_appo_id, report_test_id, report_photo]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const AddIpdReport = async (report_adm_id, report_labtest_id, report_photo) => {
    try {
        const response = await query("CALL AddIpdReport(?,?,?)", [report_adm_id, report_labtest_id, report_photo]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const UpdateIpdReport = async (report_labtest_id, report_photo) => {
    try {
        const response = await query(
            "UPDATE `tbl_ipd_report` SET rep_ipd_photo = ? WHERE rep_labtest_id = ?",
            [report_photo, report_labtest_id]
        ); return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const UpdateOpdReport = async (report_labtest_id, report_photo) => {
    try {



        const response = await query(
            "CALL UpdateOpdReport(?,?)",
            [report_labtest_id, report_photo]
            
        ); 
        
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


module.exports = { addReport, AddIpdReport, UpdateIpdReport, UpdateOpdReport };
