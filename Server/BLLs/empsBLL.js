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


// PUT - update employee details useing custom id
const updateEmployee = async (id, empDeta) => {
    try {
        // const customId = {};   //Create an object and contain the custom key:value
        // customId[key] = value;

        const newEmployee = await empsModel.findOneAndUpdate({ EmpId: id }, empDeta);  //Update employee details

        //validation
        if (!newEmployee) { //---> get the ID ?
            return console.log("Somthing went wrong :/ --> empsBLL --> PUT --> updateEmployee() ")
        }

        console.log("\nEmployee updated successfully!\n")
        const updatedEmp = await empsModel.findOne({ EmpId: id }) // use the external ID for returning the updated document.  
        return updatedEmp;  //return updated value.

    } catch (error) {
        console.log(error + "ERROR IN --> empsBLL --> PUT REQ")
    }
}


// DELETE - delete employee
const removeEmployee = async (id) => {
    try {
        // const customId = {};   //Create an object and contain the custom key:value
        // customId[key] = value;

        const removedEmpolyee = await empsModel.findOneAndDelete({ EmpId: id });  //delete employee

        console.log("Employee removed successfully!\n")
        return(`Removed employee details:\n ${removedEmpolyee}\n`)  //return deleted employee

    } catch (error) {
        console.log(error + "ERROR IN --> empsBLL -->  DELETE REQ")
    }
}

module.exports = { getAllEmployees, getEmpById, addEmployee, updateEmployee, removeEmployee }

