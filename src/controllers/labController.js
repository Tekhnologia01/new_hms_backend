const labService = require('../services/labService');
const { getEpochTime } = require('../utils/epochTime');

//***************************AddLabAssistant****************************//
const convertToArrayString = (str) => {
    return JSON.stringify(str.split(',').map(Number));
};

const addLabAssistant = async (req, res) => {
    try {
        const photo = req.files && req.files['user_photo'] ? req.files['user_photo'][0].path : null;
        const idProofImage = req.files && req.files['id_proof_image'] ? req.files['id_proof_image'][0].path : null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        const extractedIdProofImagePath = idProofImage ? idProofImage.split("\\").slice(-2).join("\\") : null;



        const {
            degree,
            licene_number,
            year_of_graduation,
            institute_name,
            issue_body,
            license_expiry_date,
            specialization,
            name,
            phoneno,
            email_id,
            sex,
            age,
            address,
            city,
            id_proof,
            department_id,
            username,
            joining_date,
            shift_id,
            day_ids,
            password,
            created_by,
            blood_group
        } = req.body;

        // Validate required fields
        if (
            !name || !phoneno || !email_id || !sex || !age || !address ||  !city
            || extractedPhotoPath === null || !id_proof || extractedIdProofImagePath === null
            || !degree || !specialization || !licene_number || !issue_body || !institute_name || !day_ids
            || !shift_id || !joining_date || !username || !password ||!blood_group
        ) {
            return res.status(400).json({ status: false, message: "Required fields are missing" });
        }
        
        await labService.addLabAssistant(
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
            getEpochTime(license_expiry_date),
            convertToArrayString(day_ids),
            getEpochTime(joining_date),
            username,
            password,
            extractedIdProofImagePath,
            extractedPhotoPath,
            licene_number,
            institute_name,
            shift_id,
            created_by,
            blood_group
        );
        
        res.status(201).json({ message: "LabAssistant added successfully" });
    } catch (error) {
        console.error("Error adding lab assistant:", error);
        res.status(500).json({ error: error.message });
    }
};


//***************************GetLabAssistants****************************//

const getLabassistants = async (req, res) => {
    
    try {
        const { page, limit } = req.query;
        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;
        const data = await labService.getLabassistants(pageNumber,limitNumber);
        res.status(200).json({
            status: true,
            data, 
            message: "LabAssistants retrieved successfully" ,
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

//***************************GetLabDepartmentwise****************************//
const getLabassistantsDepartmentwise = async (req, res) => {
    try {
        const {dep_id,page,limit} = req.query;
        const result = await labService.getLabassistantsDepartmentwise(dep_id,page,limit);
        res.status(200).json({status:true, data:result,message:"LabAssitant departmentwise retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};

//***************************AddLabTest****************************//

const AddTest = async (req, res) => {
    try {
        const { userId } = req.params;
        const photo = req.files && req.files['testPhoto'] ? req.files['testPhoto'][0].path : null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        const {
            testName,
            testDescription,
            testFees
        } = req.body;

        await labService.AddTest(
            testName,
            testDescription,
            extractedPhotoPath,
            testFees, 
            userId
        );
        res.status(201).json({ status:true, message: "Test added successfully" });
    } catch (error) {
        res.status(500).json({status:false, error: error.message });
    }
};

//***************************GetLabTest****************************//

const GetTest = async (req, res) => {
    try {
        const result = await labService.GetTest();
        
        res.status(200).json({ 
            status: true, 
            message: "Test data retrieved successfully", 
            data: result.length ? result : [] 
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};

//***************************DeleteLabTest****************************//

const DeleteTest = async (req, res) => {
    try {
        const { testId } = req.params; 
        const result = await labService.DeleteTest(testId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Test not found" });
        }

        res.status(200).json({ status: true, message: "Test deleted successfully" });
    } catch (error) {
        console.error("Error deleting test:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};

//***************************AddLabTests****************************//

const AddLabTests = async (req, res) => {
    try {
        const { labAppoiId, labTestIds, recommendationDate, testReason} = req.body;

        const arrayLabTestIds = Array.isArray(labTestIds) ? labTestIds : Array.from(labTestIds);
        if (!labAppoiId || !Array.isArray(arrayLabTestIds) || arrayLabTestIds.length === 0 || !recommendationDate ) {
            return res.status(400).json({ status: "false", message: "Missing required fields or labTestIds is not an array" });
        }

        const result = await labService.AddLabTests(labAppoiId, arrayLabTestIds, recommendationDate, testReason);

        res.status(201).json({ status: "true", message:"Lab tests added successfully" });
    } catch (error) {
        res.status(500).json({ status: "false", message: error.message });
    }
};
//***************************updateLabTests****************************//


const UpdateLabTest = async (req, res) => {
    try {
        const { labAppoiId, labTestId, testStatus } = req.body;

        // Ensure all required fields are provided
        if (!labAppoiId || !labTestId || !testStatus) {
            return res.status(400).json({ 
                status: "false", 
                message: "Missing required fields" 
            });
        }

        // Call the update service instead of the add service
        const result = await labService.UpdateLabTest(labAppoiId, labTestId, testStatus);

        res.status(200).json({ 
            status: "true", 
            message:"Lab test status updated successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            status: "false", 
            message: error.message 
        });
    }
};

//***************************GetLabTests****************************//

const GetLabTests = async (req, res) => {
    try {
        const { test_id } = req.query;
        const result = await labService.GetLabTests(test_id);

        res.status(200).json({ 
            status: true, 
            message: "lab Test data retrieved successfully", 
            data: result.data ? result : [] 
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};

const GetIpdLabTests = async (req, res) => {
    try {
        const { test_id } = req.query;
        const result = await labService.GetIpdLabTests(test_id);

        res.status(200).json({ 
            status: true, 
            message: "lab Test data retrieved successfully", 
            data: result.data ? result : [] 
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};
//***************************DeleteLabTests****************************//

const DeleteLabTests = async (req, res) => {
    try {
        const { test_id } = req.query;
        const result = await labService.DeleteLabTests(test_id);

        res.status(200).json({ 
            status: true, 
            message: "lab Test data removed successfully", 
            data: result.data ? result : [] 
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};


//***************************GetBloodGroup****************************//

const GetBloodGroup = async (req, res) => {

    try {

        const result = await labService.GetBloodGroup();

        res.status(200).json({

            status: true,

            message: " Blood Group data retrieved successfully",

            data: result

        });

    } catch (error) {

        console.error("Error retrieving blood data:", error);

        res.status(500).json({ status: false, error: error.message });

    }

};



const AddIpdLabTest = async (req, res) => {
    try {
        const { labAdmitedId, labTestIds, recommendationDate} = req.body;
        const arrayLabTestIds = Array.isArray(labTestIds) ? labTestIds : Array.from(labTestIds);
        if (!labAdmitedId || !Array.isArray(arrayLabTestIds) || arrayLabTestIds.length === 0 || !recommendationDate ) {
            return res.status(400).json({ status: "false", message: "Missing required fields or labTestIds is not an array" });
        }
        const result = await labService.AddIpdLabTest(labAdmitedId, arrayLabTestIds, getEpochTime(recommendationDate));
        res.status(201).json({ status: "true", message:"Lab tests added successfully" });
    } catch (error) {
        res.status(500).json({ status: "false", message: error.message });
    }
};




const GetIpdPatient = async (req, res) => {
    try {
        const { admitedId } = req.query;
        const result = await labService.GetIpdPatient(admitedId);

        res.status(200).json({ 
            status: true, 
            message: "lab Test data retrieved successfully", 
            data: result ? result : [] 
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};


const GetIpdAppointments = async (req, res) => {
    try {
       
        const result = await labService.GetIpdAppointments();

        res.status(200).json({ 
            status: true, 
            message: "lab appointment retrieved successfully", 
            data: result ? result : [] 
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};



const GetOpdAppointments = async (req, res) => {
    try {
        const { admitedId } = req.query;
        const result = await labService.GetOpdAppointments(admitedId);

        res.status(200).json({ 
            status: true, 
            message: "lab appointment retrieved successfully", 
            data: result ? result : [] 
        });
    } catch (error) {
        console.error("Error retrieving test data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};



module.exports = {
    addLabAssistant,
    getLabassistants,
    getLabassistantsDepartmentwise,
    AddTest,
    GetTest,
    DeleteTest,
    AddLabTests,
    UpdateLabTest,
    GetLabTests,
    DeleteLabTests,
    GetBloodGroup,
    GetIpdLabTests,
    AddIpdLabTest,
    GetIpdPatient,
    GetIpdAppointments,
    GetOpdAppointments

}