// Require the Express router
const { Router } = require("express");

// Require the controller
const {
    getEmployeesAll,
    getEmployeeById,
    addEmployee,
    deleteEmployee,
    updateEmployee,
} = require("../controllers/EmployeeController");

// Init Router
const router = Router();

// attach the application routes

// 1) GET: List all employees' information
router.get("/", getEmployeesAll);

router.get("/:id", getEmployeeById);

// 2) POST: Add a new employee
router.post("/", addEmployee);

// 3) DELETE: Delete an employee with the matching id
router.delete("/:id", deleteEmployee);

// 4) PUT: Update Employee Information
router.put("/:id", updateEmployee);

// export the router
module.exports = router;
