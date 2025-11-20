const { query } = require("../utils/database");
//***************************AddDoctor****************************//

const addDoctor = async (
    degree,
    specialization,
    year_of_graduation,
    additional_certificate,
    board_certificate,
    issue_body,
    medical_license_number,
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
    id_proof_image,
    user_photo,
    department_id,
    role_id,
    username,
    password,
    joining_date,
    created_by,
    consultancy_fee,
    shift_id,
    day_ids,
) => {
    try {
        const result = await query(
            "CALL AddDoctor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",
            [
                degree,
                specialization,
                year_of_graduation,
                additional_certificate,
                board_certificate,
                issue_body,
                medical_license_number,
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
                id_proof_image,
                user_photo,
                department_id,
                role_id,
                username,
                password,
                joining_date,
                created_by,
                consultancy_fee,
                shift_id,
                day_ids
            ]
        );

        return result;
    } catch (error) {
        console.error("Database error:", error);
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting doctor data.");
        }
    }
};

//***************************GetDoctor****************************//

const getDoctors = async (page, limit) => {
    try {
        const response = await query("CALL GetAllDoctors(?,?)", [page, limit]);
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0];
        const paginationData = response[1][0];

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

//***************************DeleteDoctor****************************//
const deleteDoctor = async (doctorId) => {
    try {
        const response = await query("UPDATE tbl_users SET user_status = ? WHERE user_id = ?", [0, doctorId]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetDoctorDepartmentwise****************************//

const getDoctorsDepartmentwise = async (dep_id, page, limit) => {
    try {


        const response = await query("CALL GetDoctorsDepartmentwise(?,?,?)", [dep_id, page, limit]);

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


const getAllDoctorsIdwise= async (doctor_id, page, limit) => {
    try {
        const response = await query("CALL GetAllAppointmentsDoctorwise(?,?,?)", [doctor_id, page, limit]);

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

//***************************GetDoctor****************************//

const getParticularDoctor = async (Doctor_id) => {
    try {
        const response = await query("CALL GetAllDoctors(?,?)",[ Doctor_id]);
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0]; 
        const paginationData = response[1][0]; 

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

//***************************GetDoctorDepartmentwise****************************//
 
const getTodaysDoctors = async (appo_date) => {
    try {
        const response = await query("CALL GetDoctorsWithTodayAppointments(?)",[appo_date]);
        // MySQL stored procedures return multiple result sets
        if (!response) {
            throw new Error("Unexpected database response format");
        }
        const doctorData = response[0]; // First result set: Doctors List
        return doctorData;  // Array of doctors
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};
 

const getDoctorsAppointmentDate = async (doctor_id, appointment_date, page, page_size) => {
    try {
        const response = await query("CALL GetDoctorsDateAppointments(?, ?, ?, ?)", [doctor_id, appointment_date, page, page_size]);
 
        // MySQL stored procedures return multiple result sets
        if (!response) {
            throw new Error("Unexpected database response format");
        }
 
        const doctorData = response[0][0]?.result; // First result set: Doctors List
 
        return doctorData;  // Array of doctors
 
       
 
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const GetIpdVisitDotors = async (admited_id) => {
    try {
        const response = await query("CALL GetIpdDoctorVisitAdmitedidwise(?)",[admited_id]);
        if (!response) {
            throw new Error("Unexpected database response format");
        }
        return response;  

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};
 




const AddDoctorsVisit = async (admited_id,doctor_id,visit_date,created_by) => {
    try {



        const response = await query("CALL AddIPDDoctorVisit(?,?,?,?)",[doctor_id,visit_date,admited_id,created_by]);
        // if (!response) {
        //     throw new Error("Unexpected database response format");
        // }


        return response;  

    } catch (error) {

        throw new Error("Database error: " + error.message);
    }
};
 



const Deletedoctorvisite = async (id) => {
    try {
        const response = await query("delete from tbl_ipd_doctor_visits where ipd_doctor_visit_id= ? ",[id]);
        if (!response) {
            throw new Error("Unexpected database response format");
        }
        return response;  

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};
 

const UpdateDoctor = async (name, phone_no, email_id, age, user_id,fees,department_id) => {
    try {
        const response = await query("Call UpdateDoctor(?,?,?,?,?,?,?)",[name, phone_no, email_id, age, user_id,fees,department_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);    
    }
};


module.exports = { addDoctor, getDoctors, deleteDoctor, getDoctorsDepartmentwise,getAllDoctorsIdwise ,getParticularDoctor,getTodaysDoctors,getDoctorsAppointmentDate,GetIpdVisitDotors,AddDoctorsVisit,Deletedoctorvisite,UpdateDoctor};

