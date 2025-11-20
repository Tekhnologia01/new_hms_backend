const express = require("express");
const { addAppointment,getDoctorAppointment,getAppointmentWiseDoctorpatientDetails,GetPrescriptionTestAppointwise, monitorPatient, GetAppointmentdatewise, GetOPDExminationDetails, updateExamination, GetAppointmentBillDetails,GetIpdAppointmentDetail, UpdateAdmitedDate} = require("../controllers/appointmentController");
const {VerifyToken}=require("../middleware/VerifyToken")
const router = express.Router();
router.use(VerifyToken);

router.get("/doctordaywise", getDoctorAppointment);
router.get("/getAppointmentWiseDoctorpatientDetails", getAppointmentWiseDoctorpatientDetails);
router.get("/getipdappointmentdetail", GetIpdAppointmentDetail);
router.post("/add/:userId", addAppointment);
router.get("/getprescriptiontest", GetPrescriptionTestAppointwise);
router.post('/monitor', monitorPatient);
router.put('/examination_update/', updateExamination);
router.get("/get_examination_details", GetOPDExminationDetails);
router.get("/getappointmentdatewise", GetAppointmentdatewise);
router.get("/getbBillDetails", GetAppointmentBillDetails);
router.put("/updateadmiteddate", UpdateAdmitedDate);

module.exports = router;
