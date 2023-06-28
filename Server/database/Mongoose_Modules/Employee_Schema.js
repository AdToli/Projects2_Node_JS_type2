const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    FirstName: { required: true, type: String },
    LastName: { required: true, type: String },
    RecruitYear: { required: false, type: Number },
    EmpId:{ required: true, type: Number },
    DepartId: { required: false, type: Number }

})

module.exports = mongoose.model("Employee", employeeSchema)

