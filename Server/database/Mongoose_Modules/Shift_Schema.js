const mongoose = require("mongoose")

const ShiftSchema = new mongoose.Schema({
   
    Day: { required: false, type: String },
    Morning: {
        On: { required: false, type: Number },
        Off: { required: false, type: Number },
        EmpId: [{ required: false, type: Number }
        ]
    },
    Evening: {
        On: { required: false, type: Number },
        Off: { required: false, type: Number },
        EmpId: [{ required: false, type: Number }
        ]
    },
    ExId: { required: false, type: Number }
})

module.exports = mongoose.model("Shift", ShiftSchema)
