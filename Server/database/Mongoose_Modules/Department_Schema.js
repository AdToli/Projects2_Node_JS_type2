const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    Name: String,
    Manager: {
        FullName: String, 
        EmpId: Number
    },
    DepartId: Number
})

module.exports = mongoose.model("department", departmentSchema)





// const departmentSchema = new mongoose.Schema({
//     Name: { type: String, required: true },
//     Manager: {
//         FullName: { type: String, required: false },
//         EmpId: { type: Number, required: false }
//     },
//     DepartId: { type: Number, required: true }
// })