const shiftsModel = require("../database/Mongoose_Modules/Shift_Schema")

// GET - get all shifts
const getAllShifts = async () => {
    const shifts = await shiftsModel.find({})
    return shifts
}

//GET - shift by ex ID or by name
const getShiftByIdOrName = async (name, id) => {
    try {
        const shift = await shiftsModel.find({ $or: [{ Day: name }, { ExId: id }] });

        if (!removedEmpolyee) {
            return console.log("Employee not found")
        } //validation
        return shift
    } catch (error) {
        console.log(error + "ERROR IN shiftsBLL GET- shift by ex ID or by name REQ")
    }

}


//GET - all emplyee shift, using "employee Id" (EmpId)
const getEmpShifts = async (userId) => {
    try {
        const shiftsObj = await getAllShifts();
        const shiftsArr =  Object.values(shiftsObj);
        const filterShifts = shiftsArr.filter(obj => {
             return obj.Morning.EmpId.includes(userId) || obj.Evening.EmpId.includes(userId);
          });
        
          return filterShifts.map(obj => {
            return {
                Day: obj.Day,
                Morning: obj.Morning,
                Evening: obj.Evening
            };
          });
        
    } catch (error) {
        console.log(error + "ERROR IN shiftsBLL GET- all emplyee shift") 
    }


}


// PUT - update Shift details useing custom key:value
const updateShift = async (key, value, shiftData) => {

    try {
        const customId = {};   //Create an object and contain the custom key:value
        customId[key] = value;


        const newShift = await shiftsModel.findOneAndUpdate(customId, shiftData);  //Update employee details

        if (!newShift) {
            return console.log("Shift not found")  //validation
        }

        console.log("Shift updated successfully!")
        const updatedShift = await shiftsModel.findOne({ customId }) // use the custom key:value and specify request for returning the updated document.  
        return updatedShift;  //return updated value.

    } catch (error) {
        console.log(error + "ERROR IN shiftsBLL PUT- update shift by ex ID")
    }
}


module.exports = { getAllEmployees, getEmpById, addEmployee, updateEmployee, removeEmployee }