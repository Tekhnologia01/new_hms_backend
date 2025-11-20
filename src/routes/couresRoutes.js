const express = require("express");
const { DeleteCourse, UpdateCourse, GetCourseDetails, AddCourse, GetTreatments, AddTreatment, UpdateTreatment, DeleteTreatment } = require("../controllers/couresController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")
router.use(VerifyToken);

router.get("/getcourse", GetCourseDetails);

router.post("/addcourse", AddCourse);

router.delete("/deletecourse", DeleteCourse);

router.put("/updatecourse", UpdateCourse);

router.get("/gettreatmnts", GetTreatments);

router.post("/addtreatment", AddTreatment);

router.put("/updatetreatment", UpdateTreatment);

router.delete("/deletetreatment", DeleteTreatment);


module.exports = router;
