const express = require("express");
const { getChargesFees,AddChargesFees,deleteChargesFees,UpdateChargesFees,AddChargesOpd, AddIpdPatientCharge, GetChargesForIpdPatient,DeleteCharge,GetChargesForOpdPatient1,DeleteOpdcharge,Addappointmentwisechargesopd} = require("../controllers/feesController");
const {VerifyToken}=require("../middleware/VerifyToken")
const router = express.Router();
router.use(VerifyToken);
router.get("/getcharges", getChargesFees);
router.post("/addcharges", AddChargesFees);
router.delete("/deletecharges/:id", deleteChargesFees);
router.post("/updatedcharges", UpdateChargesFees);
router.post("/addopdcharges", AddChargesOpd);
router.post("/addipdcharges", AddIpdPatientCharge);
router.get("/getipdpatientcharges", GetChargesForIpdPatient);
router.delete("/deletecharge", DeleteCharge);
router.get("/opdcharges", GetChargesForOpdPatient1);
router.delete("/deleteopdcharges", DeleteOpdcharge);
router.post("/addopdchargesappoimnetwise", Addappointmentwisechargesopd);



module.exports = router;
