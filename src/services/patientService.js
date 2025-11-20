// const passport = require("passport");
// const { query } = require("../utils/database");
// const { getEpochTime } = require("../utils/epochTime");

// //***************************AddPatient****************************//

// const addPatient = async (patient_name, patient_phone_no, patient_age, patient_sex, patient_address, patient_id_proof, extractedPath, photoPath, userId, patient_city, patient_blood_group) => {
//     try {
//         return await query("CALL AddPatient(?,?,?,?,?,?,?,?,?,?,?)", [
//             patient_name,
//             patient_phone_no,
//             patient_age,
//             patient_sex,
//             patient_address,
//             patient_id_proof,
//             extractedPath,
//             photoPath,
//             userId,
//             patient_city,
//             patient_blood_group
//         ]);
//     } catch (error) {

//         throw new Error(error.message);
//     }
// };
// //***************************AddPatient****************************//

// const UpdatePatient = async (patient_name, patient_phone_no, patient_age, patient_address, patient_id) => {
//     try {
//         return await query(
//             "UPDATE tbl_patient SET patient_name=?, patient_phone_no=?, patient_age=?, patient_address=? WHERE patient_id=?",
//             [patient_name, patient_phone_no, patient_age, patient_address, patient_id]
//         );
//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// //***************************GetPatient****************************//

// const getPatient = async (page, limit) => {
//     try {
//         const response = await query("CALL GetAllPatients(?,?)", [page, limit]);
//         if (!response || response.length < 2) {
//             throw new Error("Unexpected database response format");
//         }

//         const doctorData = response[0];
//         const paginationData = response[1][0];

//         return {
//             data: doctorData,  // Array of doctors
//             pagination: paginationData || {
//                 TotalRecords: 0,
//                 TotalPages: 0,
//                 CurrentPage: page,
//                 LimitPerPage: limit
//             }
//         };

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// //***************************DeletePatient****************************//

// const deletePatient = async (doctorId) => {
//     try {
//         const response = await query("UPDATE tbl_users SET user_status = ? WHERE user_id = ?", [0, doctorId]);
//         return response;
//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// //***************************GetPatientDepartmentWise****************************//

// const getPatientDepartmentwise = async (dep_id, page, limit) => {
//     try {
//         const response = await query("CALL GetPatientDepartmentwise(?,?,?)", [dep_id, page, limit]);
//         return response;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// const patientAdmit = async (
//     uh_id,
//     appointment_id,
//     department_id,
//     occupation,
//     doctor_id,
//     admit_date,
//     admit_time,
//     discharge_date,
//     discharge_time,
//     bed_id,
//     mlc_no,
//     mediclaim,
//     userId,
//     reference_doctor,
//     tpa,
//     relative_name,
//     relative_age,
//     relative_gender,
//     relative_mobile,
//     relation,
//     relative_address) => {
//     try {
//         return await query("CALL AddAdmitPatient(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
//             uh_id,
//             appointment_id,
//             department_id,
//             occupation,
//             doctor_id,
//             admit_date,
//             admit_time,
//             discharge_date,
//             discharge_time,
//             bed_id,
//             mlc_no,
//             mediclaim,
//             reference_doctor,
//             tpa,
//             relative_name,
//             relative_age,
//             relative_gender,
//             relative_mobile,
//             relation,
//             relative_address,
//             userId
//         ]);
//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// const addPatientRelative = async (
//     other_relative_name,
//     other_relative_age,
//     other_relative_gender,
//     other_relative_mobile,
//     other_relation,
//     other_relative_address,
//     admit_id,
//     ipd_id,
//     userId) => {
//     try {
//         return await query("CALL AddPatientRelative(?,?,?,?,?,?,?,?,?)", [
//             other_relative_name,
//             other_relative_age,
//             other_relative_gender,
//             other_relative_mobile,
//             other_relation,
//             other_relative_address,
//             admit_id,
//             ipd_id,
//             userId
//         ]);
//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };


// const getAdmitPatient = async (page, limit) => {
//     try {
//         const response = await query("CALL GetAdmitPatients(?,?)", [page, limit]);
//         if (!response || response.length < 2) {
//             throw new Error("Unexpected database response format");
//         }

//         const patientsData = response[0];
//         const paginationData = response[1][0];

//         return {
//             data: patientsData,  // Array of doctors
//             pagination: paginationData || {
//                 TotalRecords: 0,
//                 TotalPages: 0,
//                 CurrentPage: page,
//                 LimitPerPage: limit
//             }
//         };

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// const getOPDPatients = async (page, limit) => {
//     try {
//         // Get today's date in YYYY-MM-DD format
//         const today = new Date().toISOString().split("T")[0];

//         // Call stored procedure with the date as an additional parameter
//         const response = await query("CALL GetOPDPatients(?,?,?)", [page, limit, getEpochTime(today)]);

//         const patientData = response[0];
//         const paginationData = response[1][0];

//         return {
//             data: patientData,
//             pagination: paginationData || {
//                 TotalRecords: 0,
//                 TotalPages: 0,
//                 CurrentPage: page,
//                 LimitPerPage: limit
//             }
//         };

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };


// const getPatientCountReception = async (page, limit) => {
//     try {
//         const response = await query("CALL GetPatientCount()");
//         if (!response || response.length < 2) {
//             throw new Error("Unexpected database response format");
//         }

//         const patientsData = response[0];
//         return patientsData;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };


// const getPatientCountDoctor = async (page, limit) => {
//     try {
//         passport
//         const response = await query("CALL GetPatientCount()");
//         if (!response || response.length < 2) {
//             throw new Error("Unexpected database response format");
//         }

//         const patientsData = response[0];
//         return patientsData;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// const getOPDPatientsDoctors = async (page, limit, doctor_id) => {
//     try {
//         const response = await query("CALL GetDoctorOPDPatients(?,?,?)", [page, limit, doctor_id]);
//         if (!response || response.length < 2) {
//             throw new Error("Unexpected database response format");
//         }

//         const patientData = response[0];
//         const paginationData = response[1][0];

//         return {
//             data: patientData,  // Array of doctors
//             pagination: paginationData || {
//                 TotalRecords: 0,
//                 TotalPages: 0,
//                 CurrentPage: page,
//                 LimitPerPage: limit
//             }
//         };

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// const patientDischarge = async (
//     ipd_id,
//     chief_complaints,
//     diagnosis,
//     signs,
//     temperature,
//     pulse,
//     blood_pressure,
//     respiratory_rate,
//     cvs,
//     rs,
//     pa,
//     cns,
//     local_examination,
//     past_history,
//     discharge_advice,
//     discharge_date,
//     userId
// ) => {
//     try {
//         const result = await query(
//             "CALL DischargePatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//             [
//                 ipd_id,
//                 chief_complaints,
//                 diagnosis,
//                 signs,
//                 temperature,
//                 pulse,
//                 blood_pressure,
//                 respiratory_rate,
//                 cvs,
//                 rs,
//                 pa,
//                 cns,
//                 local_examination,
//                 past_history,
//                 discharge_advice,
//                 discharge_date,
//                 userId
//             ]
//         );
//         return result;
//     } catch (error) {
//         console.error("Database error:", error);

//         // Handling stored procedure exception
//         if (error.code === 'ER_SIGNAL_EXCEPTION') {
//             throw new Error(error.message);
//         } else {
//             throw new Error("Error inserting appointment data.");
//         }
//     }
// };

// const GetAdmitPatientParticular = async (admited_id) => {
//     try {
//         const response = await query("CALL GetAdmitPatientsParticular(?)",[admited_id]);
//         return response;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// const DischargedatePatient = async (
//     date,
//     admited_id   
// ) => {
//     try {
//         const result = await query(
//             "CALL SetdischargeDate(?, ?)",[date,admited_id]
//         );
//         return result;
//     } catch (error) {
//         console.error("Database error:", error);

//         // Handling stored procedure exception
//         if (error.code === 'ER_SIGNAL_EXCEPTION') {
//             throw new Error(error.message);
//         } else {
//             throw new Error("Error set dicharge date.");
//         }
//     }
// };


// const getIpdDetails = async (ipd_id) => {
//     try {
//         const response = await query(`Call GetPatientDischargeSummeryDetails(?)`, [ipd_id]);


//         if (response?.length <= 0) {
//             throw new Error("Unexpected database response format");
//         }



//         const ipdDetails = response[0];
//         return ipdDetails;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };


// const getDetails = async (ipd_id) => {
//     try {
//         const response = await query("SELECT * FROM tbl_discharge_detail WHERE ipd_id = ? ", [ipd_id]);

//         if (response?.length <= 0) {
//             throw new Error("Unexpected database response format");
//         }

//         const dischargeDetails = response[0];
//         return dischargeDetails;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

// const UpdatedischargePatient = async (
//     ipd_id,
//     chief_complaints,
//     diagnosis,
//     signs,
//     temperature,
//     pulse,
//     blood_pressure,
//     respiratory_rate,
//     cvs,
//     rs,
//     pa,
//     cns,
//     local_examination,
//     past_history,
//     discharge_advice,
//     discharge_date,
//     userId
// ) => {
//     try {


//             chief_complaints,
//             diagnosis,
//             signs,
//             temperature,
//             pulse,
//             blood_pressure,
//             respiratory_rate,
//             cvs,
//             rs,
//             pa,
//             cns,
//             local_examination,
//             past_history,
//             discharge_advice,
//             discharge_date,
//             userId)
//          const result = await query(
//             "CALL UpdatedischargePatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//             [
//                 ipd_id,
//                 chief_complaints,
//                 diagnosis,
//                 signs,
//                 temperature,
//                 pulse,
//                 blood_pressure,
//                 respiratory_rate,
//                 cvs,
//                 rs,
//                 pa,
//                 cns,
//                 local_examination,
//                 past_history,
//                 discharge_advice,
//                 discharge_date,

//             ]
//         );
//         return result;
//     } catch (error) {
//         console.error("Database error:", error);

//         // Handling stored procedure exception
//         if (error.code === 'ER_SIGNAL_EXCEPTION') {
//             throw new Error(error.message);
//         } else {
//             throw new Error("Error inserting appointment data.");
//         }
//     }
// };


// const GetPatientCreatedBy = async (userId) => {
//     try {
//         const response = await query("SELECT * FROM tbl_patient WHERE created_by = ? ", [userId]);
//         if (response?.length <= 0) {
//             throw new Error("Unexpected database response format");
//         }
//         return response;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };


// const GetAppointmentMonthCount = async (userId) => {
//     try {
//         const response = await query("Call GetAppointmentMonthwise(?)", [userId]);

//           const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//           // Get current month index (0-based)
//           const currentMonthIndex = new Date().getMonth(); // April is 3 (0-based)

//           // Prepare output arrays
//           const labels = allMonths.slice(0, currentMonthIndex + 1);
//           const values = labels.map(month => {
//             const match = response[0].find(item => item.month === month);
//             return match ? match.total_appointments : 0;
//           });

//          const data = {
//             month:labels,
//             count:values
//          }
//         return data;

//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };





// module.exports = {
//     addPatient,
//     getPatient,
//     deletePatient,
//     getPatientDepartmentwise,
//     patientAdmit,
//     addPatientRelative,
//     getAdmitPatient,
//     getOPDPatients,
//     getPatientCountReception,
//     getPatientCountDoctor,
//     getOPDPatientsDoctors,
//     UpdatePatient,
//     patientDischarge,
//     GetAdmitPatientParticular,
//     getIpdDetails,
//     getDetails,
//     UpdatedischargePatient,
//     DischargedatePatient,
//     GetPatientCreatedBy,
//     GetAppointmentMonthCount

// };



const passport = require("passport");
const { query } = require("../utils/database");
const { getEpochTime } = require("../utils/epochTime");

//***************************AddPatient****************************//



function aggregateByMonth(data) {
    const map = new Map();

    for (const item of data) {
        const key = `${item.year}-${item.month}`;
        if (!map.has(key)) {
            map.set(key, { year: item.year, month: item.month, total_appointments: 0 });
        }
        map.get(key).total_appointments += item.total_patient;
    }

    return Array.from(map.values());
}


const addPatient = async (patient_name, patient_phone_no, patient_age, patient_sex, patient_address, patient_id_proof, extractedPath, photoPath, userId, patient_city, patient_blood_group, id_number) => {
    try {
        return await query("CALL AddPatient(?,?,?,?,?,?,?,?,?,?,?,?)", [
            patient_name,
            patient_phone_no,
            patient_age,
            patient_sex,
            patient_address,
            patient_id_proof,
            extractedPath,
            photoPath,
            userId,
            patient_city,
            patient_blood_group,
            id_number
        ]);
    } catch (error) {

        throw new Error(error.message);
    }
};
//***************************AddPatient****************************//

const UpdatePatient = async (patient_name, patient_phone_no, patient_age, patient_address, patient_id) => {
    try {
        return await query(
            "UPDATE tbl_patient SET patient_name=?, patient_phone_no=?, patient_age=?, patient_address=? WHERE patient_id=?",
            [patient_name, patient_phone_no, patient_age, patient_address, patient_id]
        );
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetPatient****************************//

const getPatient = async (page, limit) => {
    try {
        const response = await query("CALL GetAllPatients(?,?)", [page, limit]);
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

//***************************DeletePatient****************************//

const deletePatient = async (doctorId) => {
    try {
        const response = await query("UPDATE tbl_users SET user_status = ? WHERE user_id = ?", [0, doctorId]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetPatientDepartmentWise****************************//

const getPatientDepartmentwise = async (dep_id, page, limit) => {
    try {
        const response = await query("CALL GetPatientDepartmentwise(?,?,?)", [dep_id, page, limit]);
        return response;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};




const patientAdmit = async (
    uh_id,
    appointment_id,
    department_id,
    occupation,
    doctor_id,
    admit_date,
    admit_time,
    discharge_date,
    discharge_time,
    bed_id,
    mlc_no,
    mediclaim,
    userId,
    reference_doctor,
    tpa,
    relative_name,
    relative_age,
    relative_gender,
    relative_mobile,
    relation,
    relative_address,
    mrd_no
) => {
    try {


        // const response = await query("SELECT * FROM tbl_admitted_patient WHERE uh_id = ?", [uh_id]);
        // if (response.length > 0) {
        //     return  

        // }
        // else{
        return await query("CALL AddAdmitPatient(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            uh_id,
            appointment_id,
            department_id,
            occupation,
            doctor_id,
            admit_date,
            admit_time,
            discharge_date,
            discharge_time,
            bed_id,
            mlc_no,
            mediclaim,
            reference_doctor,
            tpa,
            relative_name,
            relative_age,
            relative_gender,
            relative_mobile,
            relation,
            relative_address,
            userId,
            mrd_no
        ]);
        // }

        // return await query("CALL AddAdmitPatient(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        //     uh_id,
        //     appointment_id,
        //     department_id,
        //     occupation,
        //     doctor_id,
        //     admit_date,
        //     admit_time,
        //     discharge_date,
        //     discharge_time,
        //     bed_id,
        //     mlc_no,
        //     mediclaim,
        //     reference_doctor,
        //     tpa,
        //     relative_name,
        //     relative_age,
        //     relative_gender,
        //     relative_mobile,
        //     relation,
        //     relative_address,
        //     userId
        // ]);

    } catch (error) {
        throw new Error(error);
    }
};



const addPatientRelative = async (
    other_relative_name,
    other_relative_age,
    other_relative_gender,
    other_relative_mobile,
    other_relation,
    other_relative_address,
    admit_id,
    ipd_id,
    userId) => {
    try {
        return await query("CALL AddPatientRelative(?,?,?,?,?,?,?,?,?)", [
            other_relative_name,
            other_relative_age,
            other_relative_gender,
            other_relative_mobile,
            other_relation,
            other_relative_address,
            admit_id,
            ipd_id,
            userId
        ]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const getAdmitPatient = async (page, limit) => {
    try {
        const response = await query("CALL GetAdmitPatients(?,?)", [page, limit]);
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const patientsData = response[0];
        const paginationData = response[1][0];

        return {
            data: patientsData,  // Array of doctors
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

const getOPDPatients = async (page, limit) => {
    try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        // Call stored procedure with the date as an additional parameter
        const response = await query("CALL GetOPDPatients(?,?,?)", [page, limit, getEpochTime(today)]);

        const patientData = response[0];
        const paginationData = response[1][0];

        return {
            data: patientData,
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

const getPatientCountReception = async (page, limit) => {
    try {
        const response = await query("CALL GetPatientCount()");
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const patientsData = response[0];
        return patientsData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const getPatientCountDoctor = async (page, limit) => {
    try {
        passport
        const response = await query("CALL GetPatientCount()");
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const patientsData = response[0];
        return patientsData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getOPDPatientsDoctors = async (page, limit, doctor_id) => {
    try {
        const response = await query("CALL GetDoctorOPDPatients(?,?,?)", [page, limit, doctor_id]);
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const patientData = response[0];
        const paginationData = response[1][0];

        return {
            data: patientData,  // Array of doctors
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

const patientDischarge = async (
    ipd_id,
    chief_complaints,
    diagnosis,
    signs,
    temperature,
    pulse,
    blood_pressure,
    respiratory_rate,
    cvs,
    rs,
    pa,
    cns,
    local_examination,
    past_history,
    discharge_advice,
    discharge_date,
    follow_up_date,
    userId,
    icd_code,
    discharge_type,
    procedure_type,
    procedure_details,
) => {
    try {


        const result = await query(
            "CALL DischargePatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? , ? ,?)",
            [
                ipd_id,
                chief_complaints,
                diagnosis,
                signs,
                temperature,
                pulse,
                blood_pressure,
                respiratory_rate,
                cvs,
                rs,
                pa,
                cns,
                local_examination,
                past_history,
                discharge_advice,
                discharge_date,
                follow_up_date,
                userId,
                icd_code,
                discharge_type,
                procedure_type,
                procedure_details,
            ]
        );
        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

const GetAdmitPatientParticular = async (admited_id) => {
    try {
        const response = await query("CALL GetAdmitPatientsParticular(?)", [admited_id]);
        return response;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const DischargedatePatient = async (
    date,
    admited_id
) => {
    try {
        const result = await query(
            "CALL SetdischargeDate(?, ?)", [date, admited_id]
        );
        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error set dicharge date.");
        }
    }
};


const getIpdDetails = async (ipd_id) => {
    try {
        const response = await query(`Call GetPatientDischargeSummeryDetails(?)`, [ipd_id]);


        if (response?.length <= 0) {
            throw new Error("Unexpected database response format");
        }



        const ipdDetails = response[0];
        return ipdDetails;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const getDetails = async (ipd_id) => {
    try {
        const response = await query("SELECT dt.*,ap.mlc_no FROM tbl_discharge_detail dt join tbl_admitted_patient ap on ap.ipd_id = dt.ipd_id WHERE dt.ipd_id = ?   ", [ipd_id]);

        if (response?.length <= 0) {
            throw new Error("Unexpected database response format");
        }

        const dischargeDetails = response[0];
        return dischargeDetails;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const UpdatedischargePatient = async (
    ipd_id,
    chief_complaints,
    diagnosis,
    signs,
    temperature,
    pulse,
    blood_pressure,
    respiratory_rate,
    cvs,
    rs,
    pa,
    cns,
    local_examination,
    past_history,
    discharge_advice,
    discharge_date,
    follow_up_date,
    userId,
    icd_code,
    discharge_type,
    procedure_type,
    procedure_details,
) => {
    try {



        const result = await query(
            "CALL UpdatedischargePatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ? ,?,?)",
            [
                ipd_id,
                chief_complaints,
                diagnosis,
                signs,
                temperature,
                pulse,
                blood_pressure,
                respiratory_rate,
                cvs,
                rs,
                pa,
                cns,
                local_examination,
                past_history,
                discharge_advice,
                discharge_date,
                follow_up_date,
                icd_code,
                discharge_type,
                procedure_type,
                procedure_details,

            ]
        );
        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};


const GetPatientCreatedBy = async (userId) => {
    try {
        const response = await query("SELECT * FROM tbl_patient WHERE created_by = ? ", [userId]);
        if (response?.length <= 0) {
            throw new Error("Unexpected database response format");
        }
        return response;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const GetAppointmentMonthCount = async (userId) => {
    try {
        const response = await query("Call GetAppointmentMonthwise(?)", [userId]);

        const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Get current month index (0-based)
        const currentMonthIndex = new Date().getMonth(); // April is 3 (0-based)

        // Prepare output arrays
        const labels = allMonths.slice(0, currentMonthIndex + 1);
        const values = labels.map(month => {
            const match = response[0].find(item => item.month === month);
            return match ? match.total_appointments : 0;
        });

        const data = {
            month: labels,
            count: values
        }
        return data;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetAppointmentMonthCountAdmin = async () => {
    try {
        const response = await query("Call GetAppointmentAndAdmittedMonthwiseAdmin()");
        const data1 = aggregateByMonth(response[0])
        const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Get current month index (0-based)
        const currentMonthIndex = new Date().getMonth(); // April is 3 (0-based)

        // Prepare output arrays
        const labels = allMonths.slice(0, currentMonthIndex + 1);
        const values = labels.map(month => {
            const match = data1?.find(item => item.month === month);
            return match ? match.total_appointments : 0;
        });

        const data = {
            month: labels,
            count: values
        }

        return data;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const Getpatientinfoadmitedidwise = async (id) => {
    try {
        const response = await query("Call Getpatientinfoadmitedidwise(?)", [id]);
        return response[0];
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


module.exports = {
    addPatient,
    getPatient,
    deletePatient,
    getPatientDepartmentwise,
    patientAdmit,
    addPatientRelative,
    getAdmitPatient,
    getOPDPatients,
    getPatientCountReception,
    getPatientCountDoctor,
    getOPDPatientsDoctors,
    UpdatePatient,
    patientDischarge,
    GetAdmitPatientParticular,
    getIpdDetails,
    getDetails,
    UpdatedischargePatient,
    DischargedatePatient,
    GetPatientCreatedBy,
    GetAppointmentMonthCount,
    GetAppointmentMonthCountAdmin,
    Getpatientinfoadmitedidwise

};


