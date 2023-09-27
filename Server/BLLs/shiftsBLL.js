const shiftsModel = require("../database/Mongoose_Modules/Shift_Schema")

// GET - get all shifts
const getAllShifts = async () => {
    try {
        const shifts = await shiftsModel.find({})
        return shifts
    } catch (error) {
        return console.log(error + "ERROR IN: shiftsBLL ---> GET ---> all shifts ---> REQ")

    }

}
//GET - shift by ex ID or by day's name
const getShiftByIdOrName = async (dayName, id) => {
    try {
        const shift = await shiftsModel.find({ $or: [{ Day: dayName }, { ExId: id }] });

        //validation
        if (!shift) {
            return console.log("Shift not found")
        }

        return shift
    } catch (error) {
        return console.log(error + "ERROR IN: shiftsBLL ---> GET ---> shift by ex ID or by day Name  ---> REQ")
    }

}


// GET - get shifts by quary
const getShiftsByQuery = async (query) => {

    //GET - all employee shifts, using "employee Id" (EmpId)
    async function getEmpShifts(userId) {
        try {
            const shiftsObj = await getAllShifts();
            const shiftsArr = Object.values(shiftsObj);
            const filterShifts = shiftsArr.filter(shift => {
                return shift.Morning.EmpId.includes(userId) || shift.Evening.EmpId.includes(userId);
            });

            return filterShifts.map(shift => {
                return {
                    Day: shift.Day,
                    Morning: shift.Morning,
                    Evening: shift.Evening
                };
            });

        } catch (error) {
            return console.log(error + "ERROR IN: shiftsBLL ---> GET ---> all employee's shifts")
        }


    }

    // Handle querys:
    try {
        let results = []

        //if "ExId" key empty ---> continue to "Day" key. else ---> use getShiftByIdOrName() to get a shift by ex ID
        if (query.ExId !== undefined) {
            results = [... await getShiftByIdOrName(query.ExId)]

            //Check condition only if "ExId" key empty. if "Day" empty ---> do nothig. else ---> use getShiftByIdOrName() to get a shift by day name
        } else if (query.Day !== undefined) {
            results = [... await getShiftByIdOrName(query.Day)]
        }

        //if "EmpId" key empty ---> do nothig. else ---> use getEmpShifts() to get all specific employee's shifts.
        if (query.EmpId !== undefined) {
            results = [... await getEmpShifts(query.EmpId)]
        }

        //validation: if result empty ---> return false and an error message.
        if (results.length < 1) return { status: false, data: "Failed to return 'results' in: shiftsBLL ---> GET by quary ---> REQ" }

        //return object with 2 keys. status = true, result = array with relevant data
        return { status: true, data: results }

    } catch (error) {
        return console.log(error + "ERROR IN shiftsBLL ---> GET by quary ---> REQ")
    }
}


//POST - create new shift
const addShift = async (empObj) => {
    try {
        const shift = new shiftsModel(empObj)
        await shift.save()
        const shifts = await getAllShifts() //for updating client presentation
        return shifts
    } catch (error) {
        return { error };
    }

}


// PUT - update Shift details
const updateShift = async (id, shiftData) => {
    try {

        const newShift = await shiftsModel.findOneAndUpdate({ ExId: id }, shiftData);  //Update Shift details

        //validation
        if (!newShift) { //---> right ID ?
            return console.log("'Shift' or 'new data' missing! ---> PUT shiftsBLL")
        }

        console.log("\n Shift updated successfully! \n")
        const updatedShift = await shiftsModel.findOne({ ExId: id }) // use external ID to return the updated document.  
        return updatedShift;  //return updated value.

    } catch (error) {
        return console.log(error + "ERROR IN: shiftsBLL ---> PUT ---> REQ")
    }
}


module.exports = { getAllShifts, getShiftsByQuery, getShiftByIdOrName, addShift, updateShift }