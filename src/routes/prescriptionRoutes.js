const express = require("express");
const { addPrescription, DeletePrescription, UpdatePrescription, addIPDPrescription, getIpdPrescription, UpdateIpdPrescription, DeleteIpdPrescription, GetmedicineName } = require("../controllers/prescriptionController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")
router.use(VerifyToken);
router.post("/add", addPrescription);
router.delete("/delete", DeletePrescription);
router.put("/update_prescription", UpdatePrescription);
router.post("/ipd_add", addIPDPrescription);
router.get("/getipdprescription", getIpdPrescription);
router.put("/update_ipd_prescription", UpdateIpdPrescription);
router.delete("/delete_ipd", DeleteIpdPrescription);
router.get("/getmedicine", GetmedicineName);
module.exports = router;
