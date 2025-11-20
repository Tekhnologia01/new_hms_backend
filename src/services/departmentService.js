const { query } = require("../utils/database");

//***************************AddDepartment****************************//

const addDepartment = async (department_name, userId) => {
    try {
        return await query("CALL AddDepartment(?,?)", [department_name, userId]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetDepartment****************************//

const getDepartments = async () => {
    try {
        const [response] = await query("CALL GetAllDepartment()");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


//***************************DeleteDepartment****************************//

const deleteDepartment = async (departmentId) => {
    try {
        const response = await query("CALL DeleteDepartment(?)",[departmentId]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************UpdateDeprtment****************************//

const updateDepartment = async (department_name,departmentId) => {
    try {
        const response = await query("CALL UpdateDepartment(?,?)",[department_name,departmentId]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************DeprtmentwiseStaff****************************//

const getStaffDepartmentwise = async (dep_id, page, limit) => {
    try {
        const response = await query("CALL GetDepartmentwiseSatff(?,?,?)", [dep_id, page, limit]);

        // MySQL stored procedures return multiple result sets
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const StaffData = response[0]; // First result set: Doctors List
        const paginationData = response[1][0]; // Second result set: Pagination Info (First object)

        return {
            data: StaffData,  // Array of doctors
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




const getShift = async () => {
    try {
        const response = await query("select * from tbl_shift");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const getDay = async () => {
    try {
        const response = await query("select * from tbl_day");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};





const getAllStaff = async (page ,limit) => {
    try {
        
        const response = await query("Call GetAllStaff(?,?)",[page,limit]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



module.exports = { addDepartment, getDepartments,deleteDepartment,updateDepartment,getStaffDepartmentwise,getShift ,getDay,getAllStaff};

