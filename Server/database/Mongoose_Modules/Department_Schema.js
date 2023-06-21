const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    Name: { required: true, type: String },
    Manager: {
        FullName: { required: false, type: String },
        EmpId: { required: false, type: Number }
    },
    DepartId: { required: true, type: Number }
})

module.exports = mongoose.model("Department", departmentSchema)

