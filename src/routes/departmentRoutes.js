const express = require("express");
const { getDepartments,addDepartment,deleteDepartment,updateDepartment,getStaffDepartmentwise,getShift,getDay, getAllStaff} = require("../controllers/departmentController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")
router.use(VerifyToken);

router.get("/get", getDepartments);

router.post("/add/:userId", addDepartment);

router.delete("/delete/:departmentId", deleteDepartment);

router.put("/update/:departmentId", updateDepartment);

router.get("/getstaff", getStaffDepartmentwise);

router.get("/getshift", getShift);

router.get("/getday", getDay);

router.get("/getallstaff", getAllStaff);



module.exports = router;
