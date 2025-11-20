const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const {addReport, AddIpdReport, UpdateIpdReport,UpdateOpdReport } = require("../controllers/reportController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")
router.use(VerifyToken);

router.post(
    "/add",
    upload.fields([
      { name: "report_photo", maxCount: 1 },
    ]),
    addReport
  );

  router.post(
    "/ipdadd",
    upload.fields([
      { name: "report_photo", maxCount: 1 },
    ]),
    AddIpdReport
  );

  
  router.put(
    "/ipdupdate",
    upload.fields([
      { name: "report_photo", maxCount: 1 },
    ]),
    UpdateIpdReport
  );

  router.put(
    "/opdupdate",
    upload.fields([
      { name: "report_photo", maxCount: 1 },
    ]),
    UpdateOpdReport
  );
  
  
module.exports = router;
