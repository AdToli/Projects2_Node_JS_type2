const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    FullName: { required: true, type: String },
    ActionsRemains: { required: false, type: Number },
    UserName: { required: true, type: String },
    EmpId: { required: true, type: Number },
    ActionsAssign: { required: false, type: Number }
})

module.exports = mongoose.model("User", UserSchema)





