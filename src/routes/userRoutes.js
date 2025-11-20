const express = require("express");
const { loginUser, getUserCount, getUserCountByDepartment, getUserDetails ,ChangePassword,DeleteAccount, updateAccount} = require("../controllers/authConttroller");
const { upload } = require("../middleware/multerMiddleware");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")
// router.use(VerifyToken);
router.post("/login", loginUser);
router.get("/count", getUserCount);
router.get("/DepartmentWiseCount", getUserCountByDepartment);
router.get("/details", getUserDetails);
router.post("/changepassword", ChangePassword);
router.post("/deleteaccount", DeleteAccount);
router.put("/accountUpdate", upload.single("photo"), updateAccount);

module.exports = router;
