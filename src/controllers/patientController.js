

const patientService = require("../services/patientService");
const { getEpochTime, convertEpochToDate, epochToTime, convertEpochToDateTime } = require("../utils/epochTime");
//***************************AddPatient****************************//
const addPatient = async (req, res) => {
    try {
        const { userId } = req.params
        const { patient_name, patient_phone_no, patient_age, patient_sex, patient_address, patient_id_proof, patient_city, patient_blood_group , id_number} = req.body;
        const proofImage = req.files['patient_proof_image'] ? req.files['patient_proof_image'][0].path : null;
        const patientPhoto = req.files['patient_photo'] ? req.files['patient_photo'][0].path : null;
        const proofImagePath = proofImage ? proofImage.split("\\").slice(-2).join("\\") : null;
        const patientPhotoPath = patientPhoto ? patientPhoto.split("\\").slice(-2).join("\\") : null;




    

         if (!patient_name || !patient_phone_no || !patient_age || !patient_sex || !patient_address || !patient_city  || !id_number || !patient_blood_group ) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        await patientService.addPatient(
            patient_name,
            patient_phone_no,
            patient_age,
            patient_sex,
            patient_address,
            patient_id_proof,
            proofImagePath,
            patientPhotoPath,
            userId,
            patient_city,
            patient_blood_group,
            id_number
        );

        res.status(201).json({ status: true, message: "Patient added successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
//***************************GetPatient****************************//
const UpdatePatient = async (req, res) => {
    try {

        const { patient_name, patient_phone_no, patient_age, patient_address, patientId } = req.body;
        if (!patient_name || !patient_phone_no || !patient_age || !patient_address || !patientId) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        await patientService.UpdatePatient(
            patient_name,
            patient_phone_no,
            patient_age,
            patient_address,
            patientId,

        );

        res.status(201).json({ status: true, message: "Patient updated successfully" });

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getPatient = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;
        const doctors = await patientService.getPatient(pageNumber, limitNumber);
        res.status(200).json({ status: true, data: doctors, message: "Patient added successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

//***************************DeletePatient****************************//  
const deletePatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        if (!patientId || isNaN(patientId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing patientId" });
        }
        const result = await patientService.deletePatient();
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Patient Id not found or already deleted" });
        }
        res.status(200).json({ status: true, message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const getDepartmentwise = async (req, res) => {
    try {

        const { dep_id, page, limit } = req.query;

        const result = await patientService.getPatientDepartmentwise(dep_id, page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const admitPatient = async (req, res) => {
    try {
        const { userId } = req.params
        const {
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
            other_relative_name,
            other_relative_address,
            other_relative_mobile,
            other_relative_age,
            other_relative_gender,
            other_relation,
            mrd_no
        } = req.body;


        if (!uh_id || !doctor_id || !bed_id || !relative_name || !relative_address || !relative_age || !relative_mobile) {
            return res.status(400).json({ status: false, message: "Required fields are missing" });
        }

        const response = await patientService.patientAdmit(
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
            mediclaim === "Yes" ? 1 : 0,
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
        );

        const patient = response[0][0];

        if (other_relative_name !== "" && patient?.admit_id && patient?.ipd_id) {
            await patientService.addPatientRelative(
                other_relative_name,
                other_relative_age,
                other_relative_gender,
                other_relative_mobile,
                other_relation,
                other_relative_address,
                patient?.admit_id,
                patient?.ipd_id,
                userId,
            );
        }

        res.status(201).json({ message: "Patient admitted successfully" });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

const getAdmitPatient = async (req, res) => {
    try {

        const { page, limit } = req.query;

        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;
        const patients = await patientService.getAdmitPatient(pageNumber, limitNumber);

        // if (patients?.data.length !== 0) {
        //     patients?.data.forEach(patient => {
        //         const { date, time } = convertEpochToDateTime(patient.admitted_date)
        //         const discharge = patient.discharge_date ? convertEpochToDateTime(patient.discharge_date) : null;
        //         patient.admitted_date = date;
        //         patient.admit_time = time;
        //         patient.discharge_date = discharge ? discharge?.date : null;
        //         patient.discharge_time = discharge ? discharge?.time : null;
        //     });
        // }

        res.status(200).json({ status: true, data: patients, message: "Patient added successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getOPDPatient = async (req, res) => {
    try {

        const { page, limit } = req.query;

        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;
        const patients = await patientService.getOPDPatients(pageNumber, limitNumber);
        // if (patients?.data.length !== 0) {
        //     patients?.data.forEach(patient => {
        //         if (patient?.appointments.length !== 0) {
        //             patient.appointments.forEach(appointment => {
        //                 appointment.appointment_date = convertEpochToDate(appointment.appointment_date).split(',')[0];
        //             });
        //         }
        //     });


        // }
        res.status(200).json({ status: true, data: patients, message: "List of OPD Patient retrive successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getPatientCount = async (req, res) => {
    try {

        const { role, doctor_id } = req.query;

        if (role === "Doctor") {
            if (doctor_id) {
                const counts = await patientService.getPatientCountDoctor(role, doctor_id);

                res.status(200).json({ status: true, data: counts[0], message: "Patient count retrived successfully" });
            } else {
                return res.status(400).json({ status: false, message: "Doctor id is required" });
            }

        } else {
            const counts = await patientService.getPatientCountReception(role);

            res.status(200).json({ status: true, data: counts[0], message: "Patient count retrived successfully" });

        }
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getDoctorOPDPatient = async (req, res) => {
    try {

        const { page, limit, doctor_id } = req.query;

        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;
        const patients = await patientService.getOPDPatientsDoctors(pageNumber, limitNumber, doctor_id);
        if (patients?.data.length !== 0) {
            patients?.data.forEach(patient => {
                if (patient?.appointments.length !== 0) {
                    patient.appointments.forEach(appointment => {
                        appointment.appointment_date = convertEpochToDate(appointment.appointment_date).split(',')[0];
                    });
                }
            });


        }
        res.status(200).json({ status: true, data: patients, message: "List of OPD Patient retrive successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const dischargePatient = async (req, res) => {
    try {
        const { userId } = req.query;
        const {
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
        } = req.body;

        // Call the service function to add an appointment
        await patientService.patientDischarge(
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
        );

        res.status(201).json({ status: true, message: "Patient discharge successfully" });
    } catch (error) {
        console.error("Error discharge patient:", error);
        res.status(500).json({ status: false, error: "Internal Server Error" });
    }
};

const GetAdmitPatientParticular = async (req, res) => {
    try {

        const { admited_id } = req.query;
        if (!admited_id) {
            res.status(200).json({ status: false, message: "Admited id Required" });
        }
        const result = await patientService.GetAdmitPatientParticular(admited_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getDischargeDetails = async (req, res) => {
    try {

        const { ipd_id } = req.query;
        if (ipd_id) {
            let dischargeDetails = await patientService.getDetails(ipd_id);
            if (dischargeDetails) {
                dischargeDetails.discharge_date = convertEpochToDateTime(dischargeDetails.discharge_date_time)?.date;
                dischargeDetails.discharge_time = convertEpochToDateTime(dischargeDetails.discharge_date_time)?.time;
            }

            res.status(200).json({ status: true, data: dischargeDetails, message: "Discahrge data retrived successfully" });
        } else {
            return res.status(400).json({ status: false, message: "IPD id is required id is required" });
        }

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getIPDDetails = async (req, res) => {
    try {

        const { ipd_id } = req.query;
        if (ipd_id) {
            let ipdDetails = await patientService.getIpdDetails(ipd_id);
            if (ipdDetails) {
                ipdDetails.admitted_date = convertEpochToDateTime(ipdDetails?.admitted_date)?.date;
                ipdDetails.admit_time = convertEpochToDateTime(ipdDetails?.admitted_date)?.time;
                ipdDetails.discharge_date = convertEpochToDateTime(ipdDetails?.discharge_date_time)?.date;
                ipdDetails.discharge_time = convertEpochToDateTime(ipdDetails?.discharge_date_time)?.time;
            }
            res.status(200).json({ status: true, data: ipdDetails, message: "Discahrge data retrived successfully" });
        } else {
            return res.status(400).json({ status: false, message: "IPD id is required id is required" });
        }

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const UpdatedischargePatient = async (req, res) => {
    try {
        const { userId } = req.query;
        const {
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

        } = req.body;

        // Call the service function to add an appointment
        await patientService.UpdatedischargePatient(
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
        );

        res.status(201).json({ status: true, message: "Patient discharge successfully" });
    } catch (error) {
        console.error("Error discharge patient:", error);
        res.status(500).json({ status: false, error: "Internal Server Error" });
    }
};

const DischargedatePatient = async (req, res) => {
    try {
        const {
            date,
            admited_id,
            created_by
        } = req.body;

        await patientService.DischargedatePatient(
            date,
            admited_id,
        );

        res.status(201).json({ status: true, message: "Patient discharge date successfully" });
    } catch (error) {
        console.error("Error discharge patient:", error);
        res.status(500).json({ status: false, error: "Internal Server Error" });
    }
};


const GetPatientCreatedBy = async (req, res) => {
    try {

        const { userId } = req.query;
        if (userId) {
            let getPatientes = await patientService.GetPatientCreatedBy(userId);
            res.status(200).json({ status: true, data: getPatientes, message: "get patient data retrived successfully" });
        } else {
            return res.status(400).json({ status: false, message: "required id is required" });
        }

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};


const GetAppointmentMonthCount = async (req, res) => {
    try {

        const { userId } = req.query;
        if (userId) {
            let getPatientes = await patientService.GetAppointmentMonthCount(userId);
            res.status(200).json({ status: true, data: getPatientes, message: "get patient data retrived successfully" });
        } else {
            return res.status(400).json({ status: false, message: "required id is required" });
        }

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};


const GetAppointmentMonthCountAdmin = async (req, res) => {
    try {


        let getPatientes = await patientService.GetAppointmentMonthCountAdmin();
        res.status(200).json({ status: true, data: getPatientes, message: "get patient data retrived successfully" });


    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};








const Getpatientinfoadmitedidwise = async (req, res) => {
    try {
        const { admited_id} = req.query
        if (admited_id) {
            let response = await patientService.Getpatientinfoadmitedidwise(admited_id);
            res.status(200).json({ status: true, data: response, message: " patient data retrived successfully" });
        }
        else {
            return res.status(400).json({ status: false, message: "required id is required" });
        }
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};





module.exports = {
    addPatient,
    getPatient,
    deletePatient,
    getDepartmentwise,
    admitPatient,
    getAdmitPatient,
    getOPDPatient,
    getPatientCount,
    getDoctorOPDPatient,
    UpdatePatient,
    dischargePatient,
    GetAdmitPatientParticular,
    getDischargeDetails,
    getIPDDetails,
    UpdatedischargePatient,
    DischargedatePatient,
    GetPatientCreatedBy,
    GetAppointmentMonthCount,
    GetAppointmentMonthCountAdmin,
    Getpatientinfoadmitedidwise
};

