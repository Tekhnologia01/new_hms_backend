const express = require("express");
const { GetAdmitedPatientBill, Paydeposite, GetCollectionReportDatewise, GetAdmitedPatientReceipt,addAccountant, GetAccountant, IpdBill, TodayDischargePatientList, ChangeAdmitedpatientSatuts, GetopdReportDatewise, PaymentHistory, ChangeSatutsAllProcessCompleted } = require("../controllers/acountantController");
const { upload } = require("../middleware/multerMiddleware");
const {VerifyToken}=require("../middleware/VerifyToken")
const router = express.Router();
router.get("/paymenthistory", PaymentHistory);

router.use(VerifyToken);
router.get("/getadmtedpatientbill", GetAdmitedPatientBill);
router.post("/addpayment", Paydeposite);
router.get("/getcollection", GetCollectionReportDatewise);
router.get("/getadmtedpatientreceipt", GetAdmitedPatientReceipt);
router.post(
    "/add",
    upload.fields([
      { name: "id_proof_image", maxCount: 1 },
      { name: "user_photo", maxCount: 1 }
    ]),
    addAccountant
  );
router.get("/todaydischarge", TodayDischargePatientList);

router.put("/changestatus",ChangeAdmitedpatientSatuts);

router.get("/opdreport", GetopdReportDatewise);

router.put("/changestatusallprocesscompleted",ChangeSatutsAllProcessCompleted);




  // router.post(
  //   "/add",
  //   upload.fields([
  //     { name: "id_proof_image", maxCount: 1 },
  //     { name: "user_photo", maxCount: 1 }
  //   ]),
  //   addAccountant
  // );


  router.post('/ipdbill', upload.single("bill_report"), IpdBill);

  router.get("/get", GetAccountant);


module.exports = router;
