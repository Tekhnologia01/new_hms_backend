const doctorService = require("../services/doctorService");
const { convertEpochToDate, getEpochTime } = require("../utils/epochTime");
//***************************AddDoctor****************************//

const addDoctor = async (req, res) => {
    try {
        // Extract file paths
        const photo = req.files?.['user_photo']?.[0]?.path || null;
        const idProofImage = req.files?.['id_proof_image']?.[0]?.path || null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;

        const extractedIdProofImagePath = idProofImage ? idProofImage.split("\\").slice(-2).join("\\") : "null";

        // Extract fields from request body
        const {
            degree,
            specialization,
            year_of_graduation,
            additional_certificate,
            board_certificate,
            issue_body,
            licene_number,
            license_expiry_date,
            post_degree,
            post_specialization,
            post_year_of_graduation,
            name,
            phoneno,
            email_id,
            sex,
            age,
            address,
            city,
            id_proof,
            department_id,
            role_id,
            username,
            password,
            joining_date,
            created_by,
            consultancy_fee,
            shift_id,
            day_ids
        } = req.body;
        // Validate required fields



        if (
            !name || !phoneno || !email_id || !sex || !age || !address ||  !city
             || !id_proof 
            || !degree || !specialization || !licene_number || !issue_body || !day_ids
            || !shift_id || !joining_date || !consultancy_fee || !username || !password
        ) {
       
            return res.status(400).json({ status: false, message: "Required fields are missing" });
        }

        const  expiryDate = license_expiry_date ? getEpochTime(license_expiry_date) : null;
        
        // Call the service to add the doctor
        await doctorService.addDoctor(
            degree,
            specialization,
            year_of_graduation,
            additional_certificate,
            board_certificate,
            issue_body,
            licene_number,
            expiryDate,
            post_degree,
            post_specialization,
            post_year_of_graduation,
            name,
            phoneno,
            email_id,
            sex,
            age,
            address,
            city,
            id_proof,
            extractedIdProofImagePath,
            extractedPhotoPath,
            department_id,
            2,
            username,
            password,
            getEpochTime(joining_date),
            created_by,
            consultancy_fee,
            shift_id,
            day_ids,
        );

        res.status(201).json({ message: "Doctor added successfully" });
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: error.message });
    }
};

//***************************GetDoctor****************************//

const getDoctors = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;
        const doctors = await doctorService.getDoctors(pageNumber , limitNumber );
        if (doctors?.data.length !== 0) {
            doctors?.data.forEach(doctor => {
                doctor.joining_date = convertEpochToDate(doctor.joining_date).split(',')[0];
            });
        }
        res.status(200).json({ status: true, data: doctors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//***************************DeleteDoctor****************************//

const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId || isNaN(doctorId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing doctorId" });
        }
        // Attemp
        const result = await doctorService.deleteDoctor(doctorId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Doctor Id not found or already deleted" });
        }
        res.status(200).json({ status: true, message: "Doctor deleted successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************GetDoctorDepartmentwise****************************//

const getDoctorsDepartmentwise = async (req, res) => {
    try {
        const { dep_id, page, limit } = req.query;

        // Ensure numeric values are converted properly
        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;


        // Call the service function with explicit NULL if values are missing
        const result = await doctorService.getDoctorsDepartmentwise(dep_id, pageNumber, limitNumber);

        if (result?.data.length !== 0) {
            result?.data.forEach(doctor => {
                doctor.joining_date = convertEpochToDate(doctor.joining_date).split(',')[0];
            });
        }
        res.status(200).json({
            status: true,
            data: result,
            message: "Doctors retrieved department-wise successfully",
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


const getAllDoctorsIdwise = async (req, res) => {
    try {
        const {doctor_id,page,limit} = req.query;
        const result = await doctorService.getAllDoctorsIdwise(doctor_id,page||1,limit||10);
        if (result?.data.length !== 0) {
            result?.data.forEach(doctor => {
                doctor.Appointment_Date = convertEpochToDate(doctor.Appointment_Date).split(',')[0];
            });
        }
        res.status(200).json({status:true, data:result,message:"doctor departmentwise retrieved successfully"});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const getParticularDoctor = async (req, res) => {
    try {
        const {doctor_id} = req.query;
        const result = await doctorService.getParticularDoctor(doctor_id);
        res.status(200).json({status:true, data:result,message:"doctor retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};

const getTodayAppointmentDoctors = async (req, res) => {
    const {appointment_date} = req.query;

    try {
        const {appo_date}=req.query;
        if (!appo_date) {
            return res.status(400).json({ status: false, message: "Invalid or missing appointment date" });
        }

        const result = await doctorService.getTodaysDoctors(getEpochTime(appo_date));
        if (result.length !== 0) {
            result.forEach(doctor => {
                doctor.joiningDate = convertEpochToDate(doctor.joiningDate).split(',')[0];
            });
        }
        res.status(200).json({ status: true, data: result, message: "doctor retrieved successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

//***************************Get Todays Appointment Doctors****************************//

const getDoctorAppointmentByDate = async (req, res) => {
    const { doctor_id, appointment_date, page, page_size } = req.query;

   const data= getEpochTime(appointment_date)

    if (!doctor_id || !appointment_date) {
        return res.status(400).json({ status: false, message: "Invalid or missing doctorId or appointment date" });
    }
    try {
        const result = await doctorService.getDoctorsAppointmentDate(doctor_id, getEpochTime(appointment_date), page, page_size);
        res.status(200).json({ status: true, data: result, message: "doctor appointments retrieved successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const GetIpdVisitDotors = async (req, res) => {
    try {
        const {admited_id} = req.query;
        const result = await doctorService.GetIpdVisitDotors(admited_id);
        
        res.status(200).json({status:true, data:result,message:"Doctor visited data retrived successfully"});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



const AddDoctorsVisit = async (req, res) => {
    try {
        const { admited_id, doctor_id, visit_date, created_by } = req.body;
        
        if(!admited_id || !doctor_id || !visit_date || !created_by) {
            return res.status(400).json({
                status: false,
                message: "Invalid or missing required fields"
            });
        }

      
        const result = await doctorService.AddDoctorsVisit(admited_id, doctor_id, visit_date, created_by);

        return res.status(200).json({
            status: true,
            data: result, 
            message: "Doctor visit added successfully" 
        });
    } catch (error) {
        // Send error response
        return res.status(500).json({
            status: false,
            message: error.message || "Failed to add doctor visit" 
        });
    }
};
 




const Deletedoctorvisite = async (req, res) => {
  try {
    const { IpdDoctorVisitId } = req.query;
    const result = await doctorService.Deletedoctorvisite(IpdDoctorVisitId);
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "No records found to delete" });
    }
    res.status(200).json({ status: true, message: "Successfully deleted", data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};




const UpdateDoctor = async (req, res) => {
    try {
        const { age, email_id,name,phone_no, user_id ,fees,department_id} = req.body;

        // Validate required fields
        if (!age || !email_id || !name || !phone_no || !user_id || !department_id) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        // Call the service function with required parameters
        const result = await doctorService.UpdateDoctor(name, phone_no, email_id, age, user_id,fees,department_id);
        res.status(200).json({ status: true, message: "User added successfully", data: result });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


module.exports = { addDoctor, getDoctors,deleteDoctor,getDoctorsDepartmentwise,getAllDoctorsIdwise,getParticularDoctor, getTodayAppointmentDoctors,getDoctorAppointmentByDate,GetIpdVisitDotors,AddDoctorsVisit,Deletedoctorvisite,UpdateDoctor};
