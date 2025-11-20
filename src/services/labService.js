const { query } = require("../utils/database");
const { getEpochTime } = require("../utils/epochTime");
const addLabAssistant = async (
    name,
    phoneno,
    email_id,
    sex,
    age,
    department_id,
    address,
    city,
    id_proof,
    degree,
    specialization,
    year_of_graduation,
    issue_body,
    license_expiry_date,
    day_ids,
    joining_date,
    username,
    password,
    extractedIdProofImagePath,
    extractedPhotoPath,
    medical_license_number,
    institute_name,
    shift_id,
    created_by,
    blood_group
) => {
 

    try {
        const result = await query("CALL AddLabAssistant1(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)", [
            name,
            email_id,
            extractedPhotoPath,
            password,
            department_id,
            username,
            created_by,
            degree,
            specialization,
            year_of_graduation,
            medical_license_number,
            issue_body,
            institute_name,
            joining_date,
            getEpochTime(joining_date),
            phoneno,
            sex,
            age,
            address,
            city,
            id_proof,
            extractedIdProofImagePath,
            shift_id,
            day_ids,
            +blood_group
        ]);

        return result;
    } catch (error) {
        console.error("Database error:", error);

        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting lab assistant data.");
        }
    }
};

const getLabassistants = async (page,limit) => {
    try {
        const response = await query("CAll GetAllLabAssistants(?,?)",[page, limit]);
        const labData = response[0];
        const paginationData = response[1][0];
        return {
            data: labData,  
            pagination: paginationData || {
                TotalRecords: 0,
                TotalPages: 0,
                CurrentPage: page,
                LimitPerPage: limit
            }
        };
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getLabassistantsDepartmentwise = async (dep_id, page, limit) => {
    try {
        const response = await query("CALL GetLabAssistantDepartmentwise(?,?,?)", [dep_id, page, limit]);

        // MySQL stored procedures return multiple result sets
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0]; // First result set: Doctors List
        const paginationData = response[1][0]; // Second result set: Pagination Info (First object)

        return {
            data: doctorData,  // Array of doctors
            pagination: paginationData || {
                TotalRecords: 0,
                TotalPages: 0,
                CurrentPage: page,
                LimitPerPage: limit
            }
        };

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const AddTest = async (testName, testDescription, extractedPhotoPath, testFees, created_by) => {
    try {
        const response = await query("CALL AddTest(?,?,?,?,?)", [testName, testDescription, extractedPhotoPath, testFees, created_by]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetTest = async () => {
    try {
        const response = await query("select * from tbl_test");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const DeleteTest = async (id) => {
    try {
        const response = await query("UPDATE tbl_test SET test_status = ? WHERE test_id = ?", [0, id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const AddLabTests = async (labAppoiId, labTestIds, recommendationDate, testReason, testStatus) => {
    try {
        if (!Array.isArray(labTestIds) || labTestIds.length === 0) {
            throw new Error("labTestIds must be a non-empty array");
        }

        const results = [];

        for (const labTestId of labTestIds) {
            const result = await query(
                "CALL AddLabTest(?, ?, ?, ?)",
                [labAppoiId, labTestId, recommendationDate, testReason]
            );
            results.push(result);
        }

        return results;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const UpdateLabTest = async (labAppoiId, labTestId, testStatus) => {
    try {
        const result = await query(
            "CALL UpdateLabTestStatus(?, ?, ?)",
            [labAppoiId, labTestId, testStatus]
        );
        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetLabTests = async (test_id) => {
    try {
        const response = await query("CALL GetTodayLabAppointment(?)", [test_id]);
        const data = {
            data: response[0],
            test: response[1]
        }
        return data;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetIpdLabTests = async (test_id) => {
    try {
        const response = await query("CALL GetTodayIpdLabAppointment(?)", [test_id]);
        const data = {
            data: response[0],
            test: response[1]
        }
        return data;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const DeleteLabTests = async (test_id) => {
    try {
        const response = await query("DELETE FROM tbl_labtest WHERE lab_id =?", [test_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
}

const GetBloodGroup = async () => {
    try {
        const response = await query("Select * from tbl_blood_groups");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const AddIpdLabTest = async (labAdmitedId, labTestIds, recommendationDate) => {
    try {
        if (!Array.isArray(labTestIds) || labTestIds.length === 0) {
            throw new Error("labTestIds must be a non-empty array");
        }

        const results = [];

        for (const labTestId of labTestIds) {
            const result = await query(
                "CALL AddIpdLabTest(?, ?, ?,?)",
                [labAdmitedId, labTestId, recommendationDate,"Admited Patient"]
            );
            results.push(result);
        }

        return results;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetIpdPatient = async (admited_id) => {
    try {
        const response = await query("select il.*,t.test_name,ir.rep_ipd_photo from tbl_ipd_lab il  join tbl_test t on t.test_id=il.test_id   left join tbl_ipd_report ir on il.ipd_lab_id=ir.rep_labtest_id   where il.admited_id = ?",[admited_id]);

        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const GetIpdAppointments = async () => {
    try {
        const response = await query("Call GetTodayIpdAppointments");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetOpdAppointments = async () => {
    try {
        const response = await query("Call GetTodayLabAppointmentDashboard() ");

        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};






module.exports = {
    addLabAssistant, 
    getLabassistantsDepartmentwise,
    AddTest,
    GetTest,
    DeleteTest,
    AddLabTests,
    UpdateLabTest,
    GetLabTests,
    DeleteLabTests,
    GetBloodGroup,
    getLabassistants,
    GetIpdLabTests,
    AddIpdLabTest,
    GetIpdPatient,
    GetIpdAppointments,
    GetOpdAppointments
};