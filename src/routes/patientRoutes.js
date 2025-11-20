const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { getPatient ,UpdatePatient,addPatient,getDepartmentwise, admitPatient, getAdmitPatient, getOPDPatient, getPatientCount, getDoctorOPDPatient, dischargePatient, GetAdmitPatientParticular,getDischargeDetails,getIPDDetails, UpdatedischargePatient, DischargedatePatient, GetPatientCreatedBy, GetAppointmentMonthCount, GetAppointmentMonthCountAdmin, Getpatientinfoadmitedidwise} = require("../controllers/patientController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")

router.get(`/get_appointment_count_admin`, GetAppointmentMonthCountAdmin);
router.use(VerifyToken);
router.get("/getAll", getPatient);
router.get("/getDepartmentwise", getDepartmentwise);
router.get("/get_opd", getOPDPatient);
router.get("/get_doctor_opd", getDoctorOPDPatient);
router.post(
  "/addpatient/:userId",
  upload.fields([
    { name: "patient_proof_image", maxCount: 1 },
    { name: "patient_photo", maxCount: 1 }
  ]),
  addPatient
);



router.post("/update",UpdatePatient);
router.post( "/admit/:userId",admitPatient);
router.get(`/get_admit_patients`, getAdmitPatient);
router.get(`/get_admit_patient_particular`, GetAdmitPatientParticular);
router.get(`/get_patient_count`, getPatientCount);
router.get(`/get_discahrge_details`, getDischargeDetails);
router.post('/discharge', dischargePatient);
router.get(`/get_ipd_details`, getIPDDetails);
router.put('/updatedischarge', UpdatedischargePatient);
router.put('/setdischargedate', DischargedatePatient);
router.get(`/get_patient_createdby`, GetPatientCreatedBy);
router.get(`/get_appointment_count`, GetAppointmentMonthCount);
router.get(`/get_patientinfo_admited_idwise`, Getpatientinfoadmitedidwise);



module.exports = router;
