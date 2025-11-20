const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { getReceptionist,addReceptionist,getReceptionistsDepartmentwise, UpdateUser } = require("../controllers/ReceptionistController");
const {VerifyToken}=require("../middleware/VerifyToken")

const router = express.Router();
router.use(VerifyToken);

router.get("/get", getReceptionist);
router.get("/getReceptionitsDepartmentwise", getReceptionistsDepartmentwise);
router.post("/updateuser", UpdateUser);
router.post(
  "/add",
  upload.fields([
    { name: "id_proof_image", maxCount: 1 },
    { name: "user_photo", maxCount: 1 }
  ]),
  addReceptionist
);

module.exports = router;
