const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { addLabAssistant,getLabassistants,getLabassistantsDepartmentwise ,AddTest,GetTest,DeleteTest,AddLabTests,UpdateLabTest,GetLabTests,GetBloodGroup, DeleteLabTests,GetIpdLabTests, AddIpdLabTest, GetIpdPatient, GetIpdAppointments, GetOpdAppointments} = require("../controllers/labController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken");
router.use(VerifyToken);

router.get("/getLabassistantDepartmentwise", getLabassistantsDepartmentwise);
router.get("/get", getLabassistants);

router.post(
  "/add",
  upload.fields([
    { name: "id_proof_image", maxCount: 1 },
    { name: "user_photo", maxCount: 1 }
  ]),
  addLabAssistant
);

router.post(
  "/addtest/:userId",
  upload.fields([
    { name: "testPhoto", maxCount: 1 }]),
    AddTest
);

router.delete("/deletetest/:testId",DeleteTest);
router.get("/gettest", GetTest);
router.post("/addlabtest", AddLabTests);
router.post("/updatelabtest", UpdateLabTest);
router.get("/getlabtest",GetLabTests );
router.get("/getipdlabtest",GetIpdLabTests );
router.delete("/delete_patient_test",DeleteLabTests);
router.get("/getbloodgroup",GetBloodGroup);
router.post("/addipdlabtest", AddIpdLabTest);
router.get("/getipdpatient", GetIpdPatient);
router.get("/getipdappointment", GetIpdAppointments);
router.get("/getopdappointment", GetOpdAppointments);


module.exports = router;
