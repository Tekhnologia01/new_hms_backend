const express = require("express");
const {sendOtp,verifyOtp,changePassword} = require("../controllers/forgotController");
const router = express.Router();

router.post('/sendotp',sendOtp);
router.post('/verifyotp',verifyOtp);
router.post('/changepassword',changePassword);


module.exports = router;
