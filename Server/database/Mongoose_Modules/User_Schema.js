const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    EmpId: { required: true, type: Number },
    ActionsAssign: { required: false, type: Number },
    FullName: { required: true, type: String },
    ActionsRemains: { required: false, type: Number }

})

module.exports = mongoose.model("User", UserSchema)





