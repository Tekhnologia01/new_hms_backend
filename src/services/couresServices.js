const { query } = require("../utils/database");

//***************************AddCourse****************************//

const AddCourse = async (admited_id, course_details) => {
    try {
        return await query("INSERT INTO tbl_courses (admit_id, course_details) VALUES (?, ?)", [admited_id,course_details ]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetCourse****************************//

const GetCourseDetails = async (admited_id) => {
    try {
        
        const [response] = await query("SELECT * FROM tbl_courses WHERE admit_id = ?", [admited_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************DeleteCourse****************************//

const DeleteCourse = async (courseId) => {
    try {
        // Validate input
        if (!courseId || isNaN(parseInt(courseId))) {
            throw new Error("Valid course ID is required");
        }

        const [response] = await query(
            "DELETE FROM tbl_courses WHERE id = ?",
            [parseInt(courseId)]
        );
        // Check if any rows were affected
        if (response.affectedRows === 0) {
            throw new Error("No course found with the provided ID");
        }

        return {
            success: true,
            affectedRows: response.affectedRows,
            message: "Course deleted successfully"
        };
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
};
//***************************UpdatCourse****************************//

const UpdateCourse = async (course_details,admited_id) => {
    try {

         const response = await query("UPDATE tbl_courses SET course_details = ? WHERE admit_id = ?", [course_details, admited_id]);
         return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


//***************************AddTreatment****************************//

const AddTreatment = async (admited_id, treatment_point) => {
        try {
            return await query("INSERT INTO tbl_treatment_points (admit_id, point_text) VALUES (?, ?)", [admited_id,treatment_point ]);
        } catch (error) {
            throw new Error("Database error: " + error.message);
        }
};

//***************************GetTreatment*************************//

const GetTreatments = async (admited_id) => {
    try {
        const response = await query("SELECT * FROM tbl_treatment_points where admit_id = ? ",[admited_id]);
                return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************UpdatTreatment****************************//

const UpdateTreatment = async (treatment_points,treatment_id) => {
    try {

         const response = await query("UPDATE tbl_treatment_points SET point_text = ? WHERE id = ?", [treatment_points, treatment_id]);
         return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const DeleteTreatment = async (treatment_id) => {
    try {
        const response = await query("Delete FROM tbl_treatment_points where id = ? ",[treatment_id]);
                return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

module.exports = { AddCourse, GetCourseDetails,DeleteCourse,UpdateCourse,AddTreatment,GetTreatments,UpdateTreatment,DeleteTreatment};

