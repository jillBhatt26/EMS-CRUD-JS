// Require the Employee Model
const Employee = require("../models/Employee");

// require mongoose
const mongoose = require("mongoose");

// Controller Definitions
const getEmployeesAll = async (req, res) => {
    try {
        const employees = await Employee.find({});

        res.status(200).json({ employees });
    } catch (error) {
        res.status(error.statusCode).json({ error });
    }
};

const getEmployeeById = async (req, res) => {
    // fetch the id from request params
    const id = req.params.id;

    // parse the id to mongodb object id
    const objID = mongoose.Types.ObjectId(id);

    // fetch the employee from mongodb
    try {
        const employee = await Employee.findById(objID);

        res.status(200).json({ employee });
    } catch (error) {
        res.status(error.statusCode).json({ error });
    }
};

const addEmployee = async (req, res) => {
    // fetch employee information from request body
    const { name, department, post } = req.body;
    try {
        // save the employee to mongodb
        const empAdded = await Employee.create({ name, department, post });

        res.status(200).json({ empAdded });
    } catch (error) {
        res.status(error.statusCode).json({ error });
    }
};

const deleteEmployee = async (req, res) => {
    // get the id from request params
    const { id } = req.params;

    // parse the id to mongodb object id
    const objID = mongoose.Types.ObjectId(id);

    // find and remove the employee with the particular id
    try {
        await Employee.deleteOne({
            _id: objID,
        });

        res.status(200).json({ message: "Employee deleted!" });
    } catch (error) {
        res.status(error.statusCode).json({ error: "Deletion Failed!" });
    }
};

const updateEmployee = async (req, res) => {
    // get the id from request params
    const { id } = req.params;

    // parse the id into mongodb object id
    const objID = mongoose.Types.ObjectId(id);

    // update the employee in mongodb
    try {
        await Employee.updateOne({ _id: objID }, req.body);

        res.status(200).json({ message: "Employee Information Updated!!" });
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Export all the controllers
module.exports = {
    getEmployeesAll,
    getEmployeeById,
    addEmployee,
    deleteEmployee,
    updateEmployee,
};
