const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    EmpId: { required: true, type: Number },
    ActionsAssign: { required: false, type: Number },
    FullName: { required: true, type: String }

})

module.exports = mongoose.model("User", UserSchema)





