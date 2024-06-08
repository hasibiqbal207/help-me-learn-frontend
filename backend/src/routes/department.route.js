import express from "express";
const router = express.Router();


// Department
let departmentController = require("../controller/deptController");

router.get("/", departmentController.getDepartments);
router.get("/:id", departmentController.getDepartmentById);

router.post("/", createDeptValidation, departmentController.createDepartment);

router.put("/", updateDeptValidation, departmentController.updateDepartment);

router.delete("/:id", departmentController.deleteDepartment);

 export default router;