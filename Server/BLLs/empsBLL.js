const empsModel = require("../database/Mongoose_Modules/Employee_Schema")



// GET - get all employees
const getAllEmployees = async () => {
    return await empsModel.find({})
}

// GET - get employee by exernal ID
const getEmpById = async (id) => {
    const employee = await empsModel.findOne({ EmpId: id })
    return employee;
}

// POST - create a new employee doucument
const addEmployee = async (empObj) => {
    const employee = new empsModel(empObj)
    await employee.save()
    const employees = await getAllEmployees() //for updating client present
    return employees
}


// PUT - update employee details useing custom key:value
const updateEmployee = async (key, value, empDeta) => {
    try {
        const customId = {};   //Create an object and contain the custom key:value
        customId[key] = value;


        const newEmployee = await empsModel.findOneAndUpdate(customId, empDeta);  //Update employee details


        if (!newEmployee) {
            return console.log("Employee not found")  //validation
        }


        console.log("Employee updated successfully!")
        const updatedEmp = await empsModel.findOne({ customId }) // use the custom key:value and specify request for returning the updated document.  
        return updatedEmp;  //return updated value.

    } catch (error) {
        console.log(error + "ERROR IN empsBLL PUT REQ")
    }
}

// DELETE - remove employee
const removeEmployee = async (key, value,) => {
    try {
        const customId = {};   //Create an object and contain the custom key:value
        customId[key] = value;

        const removedEmpolyee = await empsModel.findOneAndDelete(customId);  //Delete employee

        if (!removedEmpolyee) {
            return console.log("Employee not found")  //validation
        }
        console.log("Employee removed successfully!")
        return removedEmpolyee  //return deleted employee

    } catch (error) {
        console.log(error + "ERROR IN empsBLL DELETE REQ")
    }
}

module.exports = { getAllEmployees, getEmpById, addEmployee, updateEmployee, removeEmployee }

