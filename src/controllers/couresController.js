const couresServices = require("../services/couresServices");

//***************************AddCourse****************************//

const AddCourse = async (req, res) => {
    try {
        const { admited_id, course_details } = req.body;
        if (!admited_id || !course_details) {
            return res.status(400).json({
                status: false,
                message: "Admitted ID and course details are required"
            });
        }


        await couresServices.AddCourse(admited_id, course_details);

        res.status(201).json({
            status: true,
            message: "Course details added successfully"
        });
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

//***************************GetCourse****************************//

const GetCourseDetails = async (req, res) => {
    try {
        const { admited_id } = req.query;

        // Input validation
        if (!admited_id || isNaN(parseInt(admited_id))) {
            return res.status(400).json({
                status: false,
                message: "Valid course_id is required"
            });
        }

        const courseIdNum = parseInt(admited_id);
        const courseDetails = await couresServices.GetCourseDetails(courseIdNum);



      
        if (!courseDetails || courseDetails.length === 0) {
            return res.status(404).json({
                status: false,
                data: [],
                message: "No course details found for the provided ID"
            });
        }

        res.status(200).json({
            status: true,
            data: courseDetails,
            message: "Course details retrieved successfully"
        });
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).json({
            status: false,
            message: error.message || "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

//***************************UpdateCourse****************************//

const UpdateCourse = async (req, res) => {
    try {

        const { course_details, admited_id } = req.body;

        if (!course_details || !admited_id) {
            return res.status(400).json({
                status: false,
                message: "Admitted ID and course details are required"
            });
        }
        await couresServices.UpdateCourse(course_details, admited_id);

        res.status(201).json({
            status: true,
            message: "Course details updated successfully"
        });
    } catch (error) {
        console.error("Error update Course details:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

//***************************DeleteCourse****************************//

const DeleteCourse = async (req, res) => {
    try {

        const { course_id } = req.query;

        if (!course_id) {
            return res.status(400).json({
                status: false,
                message: "Course ID required"
            });
        }
        await couresServices.DeleteCourse(course_id);
        res.status(201).json({
            status: true,
            message: "Course details deleted successfully"
        });
    } catch (error) {
        console.error("Error update Course details:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

//***************************AddCourse****************************//

const AddTreatment = async (req, res) => {
    try {
        const { admited_id, treatment_point } = req.body;
        if (!admited_id || !treatment_point) {
            return res.status(400).json({
                status: false,
                message: "Admitted ID and treatment point are required"
            });
        }

        await couresServices.AddTreatment(admited_id, treatment_point);
        res.status(201).json({
            status: true,
            message: "Treatment Point added successfully"
        });


    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

const GetTreatments = async (req, res) => {
    try {
        const {admited_id}=req.query
        const courseDetails = await couresServices.GetTreatments(admited_id);

        if (!courseDetails || courseDetails.length === 0) {
            return res.status(404).json({
                status: false,
                data: [],
                message: "No treatment point found"
            });
        }

        res.status(200).json({ status: true, data: courseDetails,message: "Course details retrieved successfully"});

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message || "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

const UpdateTreatment = async (req, res) => {
    try {

        const { treatment_point, treatment_id} = req.body;

        if (!treatment_point || !treatment_id) {
            return res.status(400).json({
                status: false,
                message: "Admitted ID and course details are required"
            });
        }

        await couresServices.UpdateTreatment(treatment_point, treatment_id);
        res.status(201).json({
            status: true,
            message: "Treatment Points updated successfully"
        });
    } catch (error) {
        console.error("Error update Course details:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};



const DeleteTreatment = async (req, res) => {
    try {

        const {treatment_id}=req.query
       

        const courseDetails = await couresServices.DeleteTreatment(treatment_id);

        if (!courseDetails || courseDetails.length === 0) {
            return res.status(404).json({
                status: false,
                message: " treatment point not found"
            });
        }

        res.status(200).json({ status: true, message: "Treatment point Delete successfully"});

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message || "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

module.exports = { AddCourse, GetCourseDetails, UpdateCourse, DeleteCourse,AddTreatment,UpdateTreatment,GetTreatments ,DeleteTreatment};
