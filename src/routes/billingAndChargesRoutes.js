const express = require("express");
const router = express.Router();
const { billingAndCharges, GetAllBillingAndCharges, UpdateBillingAndCharges,addDoctorBill, updateBillById} = require("../controllers/billingAndChargesController");
const {VerifyToken}=require("../middleware/VerifyToken")
router.use(VerifyToken);

const { upload } = require("../middleware/multerMiddleware");
router.post("/BillingAndCharges", billingAndCharges);
router.get('/GetAllBillingAndCharges', GetAllBillingAndCharges);
router.put('/UpdateBillingAndCharges/:id', UpdateBillingAndCharges);
router.post('/createbill', addDoctorBill);
router.put('/completebill', upload.single("bill_report"), updateBillById);

module.exports = router;    