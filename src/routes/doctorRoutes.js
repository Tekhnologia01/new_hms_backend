const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { getDoctors ,addDoctor,deleteDoctor,getDoctorsDepartmentwise,getAllDoctorsIdwise,getTodayAppointmentDoctors,getDoctorAppointmentByDate, GetIpdVisitDotors, AddDoctorsVisit, Deletedoctorvisite, UpdateDoctor} = require("../controllers/doctorController");
const {VerifyToken}=require("../middleware/VerifyToken")
const router = express.Router();
router.use(VerifyToken);

router.get("/get", getDoctors);
router.get("/getDoctorsDepartmentwise", getDoctorsDepartmentwise);
router.get("/getAllApointmentDoctorswise", getAllDoctorsIdwise);
router.get("/getDoctorsWithTodayAppointment", getTodayAppointmentDoctors);
router.get("/getDoctorsAppointmentByDate", getDoctorAppointmentByDate);

router.post(
  "/add",
  upload.fields([
    { name: "id_proof_image", maxCount: 1 },
    { name: "user_photo", maxCount: 1 }
  ]),
  addDoctor
);

router.delete("/delete/:doctorId",deleteDoctor);

router.get("/getipddoctorvisits", GetIpdVisitDotors);

router.post("/adddoctorvisit", AddDoctorsVisit);



router.post("/updatedoctor", UpdateDoctor);

router.delete("/deleteoctorvisit", Deletedoctorvisite);


module.exports = router;
