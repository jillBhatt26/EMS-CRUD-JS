// Require model and schema from mongoose
const { model, Schema } = require("mongoose");

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
});

const Employee = model("Employee", EmployeeSchema);

module.exports = Employee;
