const empsModel = require("../database/Mongoose_Modules/Employee_Schema")



// GET - get all employees
const getAllEmployees = async () => {
    return await empsModel.find({})
}





// GET - get employee by exernal ID
const getEmpById = async (id) => {
    try {
        const employee = await empsModel.findOne({ EmpId: id })
        return employee;
    } catch (error) {
        return { error: error };
    }

}


// POST - create a new employee doucument
const addEmployee = async (empObj) => {
    try {
        const employee = new empsModel(empObj)
        await employee.save()
        const employees = await getAllEmployees() //for updating client present
        return employees
    } catch (error) {
        return { error: error };
    }

}


// PUT - update employee details
const updateEmployee = async (id, empDeta) => {
    try {

        const newEmployee = await empsModel.findOneAndUpdate({ EmpId: id }, empDeta);  //Update employee's details

        //validation
        if (!newEmployee) {
            return false;
        }
        return newEmployee; //return updated value.

    } catch (error) {
        return { error: error };
    }
}

// DELETE - delete employee
const removeEmployee = async (id) => {
    try {

        const empolyeeToRmove = await empsModel.findOneAndDelete({ EmpId: id });  //delete employee

        return { status: true, DeletedEmp: empolyeeToRmove }  //return deleted employee

    } catch (error) {
        return { error: error };
    }
}

module.exports = { getAllEmployees, getEmpById, addEmployee, updateEmployee, removeEmployee }

