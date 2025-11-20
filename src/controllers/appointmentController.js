
const appointmentService = require("../services/appointmentService");
const { getEpochTime, convertEpochToDate, convertEpochToDateTime } = require("../utils/epochTime");

//***************************AddAppointment****************************//
const addAppointment = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      patient_id,
      review,
      patient_source,
      visited_type,
      appointment_time,
      date,
      doctor_id,
      appo_department_id,
      disease
    } = req.body;

    // Validate required fields
    if (!patient_id || !review || !patient_source || !visited_type || !appointment_time || !date || !doctor_id || !userId || !appo_department_id) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }


    

    // Call the service function to add an appointment
    await appointmentService.addAppointment(
      patient_id,
      review,
      patient_source,
      visited_type,
      appointment_time,
      getEpochTime(date),
      doctor_id,
      appo_department_id,
      userId,
      disease
    );

    res.status(201).json({ status: true, message: "Doctor appointment added successfully" });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
//***************************GetDoctorAndDayAppointment****************************//

const getDoctorAppointment = async (req, res) => {
  try {
    const { doctor_id, appointment_date } = req.query;
    const result = await appointmentService.getDoctorAppointment(doctor_id, getEpochTime(appointment_date));
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }

    if (result.length !== 0) {
      result.forEach(appointment => {
        appointment.Appointment_Date = convertEpochToDate(appointment.Appointment_Date).split(',')[0];
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentWiseDoctorpatientDetails = async (req, res) => {
  try {
    const { appo_id } = req.query;
    const result = await appointmentService.getAppointmentWiseDoctorpatientDetails(appo_id);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetIpdAppointmentDetail = async (req, res) => {
  try {
    const { admited_id } = req.query;
    const result = await appointmentService.GetIpdAppointmentDetail(admited_id);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetPrescriptionTestAppointwise = async (req, res) => {
  try {
    const { appo_id } = req.query;
    const result = await appointmentService.GetPrescriptionTestAppointwise(appo_id);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//***************************Monito Patient****************************//

const monitorPatient = async (req, res) => {
  try {
    const { userId } = req.query;
    const {
      uh_id,
      appointment_id,
      chief_complaints,
      personal_history,
      past_medical_history,
      present_medication,
      general_condition,
      pulse,
      blood_pressure,
      respiratory_rate,
      spo2,
      signs,
      respiratory_system,
      cardiovascular_system,
      central_nervous_system,
      per_abdomen
    } = req.body;

    // Call the service function to add an appointment
    await appointmentService.addExamination(
      uh_id,
      appointment_id,
      chief_complaints,
      personal_history,
      past_medical_history,
      present_medication,
      general_condition,
      pulse,
      blood_pressure,
      respiratory_rate,
      spo2,
      signs,
      respiratory_system,
      cardiovascular_system,
      central_nervous_system,
      per_abdomen,
      userId
    );

    res.status(201).json({ status: true, message: "Doctor appointment added successfully" });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const GetAppointmentdatewise = async (req, res) => {

  try {

    const { appointment_date } = req.query;

    const convertedDate = getEpochTime(appointment_date);
    if (convertedDate !== "Invalid Date") {
      const result = await appointmentService.GetAppointmentdatewise(convertedDate);

      if (!result || (Array.isArray(result) && result.length <= 1)) {

        return res.status(200).json({

          status: true,

          data: []

        });

      }
      result[0].forEach(appointment => {
        appointment.appo_date = convertEpochToDateTime(appointment.appo_date);
      });
      res.status(200).json({ status: true, data: result });

    } else {
      return res.status(400).json({ status: false, message: "Appointment date is required" });
    }


  } catch (error) {


    res.status(500).json({ error: error.message });

  }

};

const GetOPDExminationDetails = async (req, res) => {

  try {

    const { appointment_id } = req.query;

    const result = await appointmentService.GetExamination(appointment_id);

    if (!result || (Array.isArray(result) && result.length === 0)) {

      return res.status(200).json({

        status: true,

        data: []

      });

    }

    res.status(200).json({ status: true, data: result });

  } catch (error) {


    res.status(500).json({ error: error.message });

  }

};

const updateExamination = async (req, res) => {
  try {
    const { userId } = req.query;
    const {
      opd_examination_id,
      appointment_id,
      chief_complaints,
      personal_history,
      past_medical_history,
      present_medication,
      general_condition,
      pulse,
      blood_pressure,
      respiratory_rate,
      spo2,
      signs,
      respiratory_system,
      cardiovascular_system,
      central_nervous_system,
      per_abdomen
    } = req.body;

    // Validate required fields
    if (!opd_examination_id || !chief_complaints) {
      return res.status(400).json({ status: false, message: "Fields are missing" });
    }

    // Call the service function to add an appointment
    await appointmentService.updateExamination(
      opd_examination_id,
      appointment_id,
      chief_complaints,
      personal_history,
      past_medical_history,
      present_medication,
      general_condition,
      pulse,
      blood_pressure,
      respiratory_rate,
      spo2,
      signs,
      respiratory_system,
      cardiovascular_system,
      central_nervous_system,
      per_abdomen,
      userId
    );

    res.status(201).json({ status: true, message: "Doctor examination updated successfully" });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const GetAppointmentBillDetails = async (req, res) => {

  try {

    const { appointment_id } = req.query;

    if (appointment_id) {
      const result = await appointmentService.GetAppointmentDetail(appointment_id);

      if (!result || (Array.isArray(result) && result.length === 0)) {

        return res.status(200).json({

          status: true,

          data: []

        });

      }
      res.status(200).json({ status: true, data: result });

    } else {
      return res.status(400).json({ status: false, message: "Appointment id is required" });
    }


  } catch (error) {


    res.status(500).json({ error: error.message });

  }

};

const UpdateAdmitedDate = async (req, res) => {
  try {
    const {admited_id,admited_date} = req.body;

    // Validate required fields
    if (!admited_id || !admited_date) {
      return res.status(400).json({ status: false, message: "Fields are missing" });
    }

    await appointmentService.UpdateAdmitedDate(admited_id,admited_date);

    res.status(201).json({ status: true, message: "Admission date updated successfully" });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = {
  addAppointment,
  getDoctorAppointment,
  getAppointmentWiseDoctorpatientDetails,
  GetPrescriptionTestAppointwise,
  monitorPatient,
  GetAppointmentdatewise,
  GetOPDExminationDetails,
  updateExamination,
  GetAppointmentBillDetails,
  GetIpdAppointmentDetail,
  UpdateAdmitedDate
};
