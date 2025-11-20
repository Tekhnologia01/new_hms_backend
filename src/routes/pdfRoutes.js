const express = require("express");
const { generateDischargePDFController } = require("../controllers/pdfGenerateController")
const router = express.Router();

router.post('/generate_discharge_pdf', generateDischargePDFController);


module.exports = router;
