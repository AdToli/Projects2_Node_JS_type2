const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    Name : {type: String},
    Manager : {
        FullName : {type: String},
        EmpId : {required: true, type: Number}
    },
    DepartId : {required: true, type: Number}
})

module.exports = mongoose.model("Department", departmentSchema)

