const express = require("express");
const { getDoctorsSlots } = require("../controllers/slotsController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")
// router.use(VerifyToken);

router.get("/getDoctorSlots", getDoctorsSlots);

module.exports = router;
