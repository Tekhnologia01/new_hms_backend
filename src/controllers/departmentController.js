const departmentService = require("../services/departmentService");

//***************************AddDepartment****************************//

const addDepartment = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { department_name } = req.body;
        if (!department_name || !userId) {
            return res.status(400).json({status:false, message: "Department name and user ID are required" });
        }
        await departmentService.addDepartment(department_name, userId);
        res.status(201).json({status:true, message: "Department added successfully" });
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//***************************GetDepartments****************************//

const getDepartments = async (req, res) => {
    try {
        const departments = await departmentService.getDepartments();
        // If no departments found, return false status
        if (!departments || departments.length === 0) {
            return res.status(404).json({ status: true, data:[] ,message: "No departments found" });
        }

        res.status(200).json({ status: true, data: departments ,message: "Departments get succefully"});
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************DeleteDepartments****************************//

const deleteDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        // Validate departmentId
        if (!departmentId || isNaN(departmentId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing departmentId" });
        }
        // Attempt to delete department
        const result = await departmentService.deleteDepartment(departmentId);
        console.log(result[0][0].message)
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Department not found or already deleted" });
        }

        res.status(200).json({ status: true, message:  result[0][0]?.message });
    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************DeleteDepartments****************************//

const updateDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { department_name } = req.body;

        // Validate input
        if (!departmentId || isNaN(departmentId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing departmentId" });
        }
        if (!department_name) {
            return res.status(400).json({ status: false, message: "Department name is required" });
        }

        // Attempt to update department
        const result = await departmentService.updateDepartment(departmentId, department_name);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Department not found or no changes made" });
        }

        res.status(200).json({ status: true, message: "Department updated successfully" });
    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************DepartmentwiseStaff****************************//

const getStaffDepartmentwise = async (req, res) => {
    try {
        const {dep_id,page,limit} = req.query;
        const result = await departmentService.getStaffDepartmentwise(dep_id,page,limit);
        res.status(200).json({status:true, data:result,message:"Staff departmentwise retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};
//***************************Common Api****************************//

const getShift = async (req, res) => {
    try {

        const result = await departmentService.getShift();
        res.status(200).json({status:true, data:result,message:"Shift  retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};


const getDay = async (req, res) => {
    try {

        const result = await departmentService.getDay();
        res.status(200).json({status:true, data:result,message:"Shift  retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};




const getAllStaff = async (req, res) => {
    try {
        const { page , limit  } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
            return res.status(400).json({
                status: false,
                message: 'Page and limit must be positive integers.'
            });
        }
     
        const result = await departmentService.getAllStaff(pageNum, limitNum);

        res.status(200).json({
            status: true,
            data: result,
            message: 'Staff retrieved successfully'
        });
    } catch (error) {
        console.error('Error in getAllStaff:', error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while retrieving staff.'
        });
    }
};



module.exports = { addDepartment, getDepartments ,deleteDepartment,updateDepartment,getStaffDepartmentwise,getShift,getDay,getAllStaff};
