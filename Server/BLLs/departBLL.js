const departModel = require("../database/Mongoose_Modules/Department_Schema")
const empsBLL = require("./empsBLL")



//GET - get all departments
const getAllDepartments = async () => {
    return await departModel.find({})
}

// GET - get department by exernal ID
const getDepartById = async (id) => {
    const department = await departModel.findOne({ DepartId: id })
    return department;
}
// GET - get all employees of some department
const getAllDprtsEmps = async (id) => {
    const allEmps = await empsBLL.getAllEmployees();
    const departEmps = allEmps.filter(el => el.DepartId == id)
    return departEmps;
}

// POST - create a new Department doucument
const addDepartment = async (depObj) => {
    const department = new departModel(depObj)
    await department.save()
    const allDepartments = await getAllDepartments() //for updating client present
    return allDepartments
}
// PUT - update department details using custom key:value
const updateDepartment = async (id, depData) => {
    try {
        // const customId = {};   //Create an object and contain the custom key:value
        // customId[key] = value;

        const newDepartment = await departModel.findOneAndUpdate(id, depData);  //Update Department details

        if (!newDepartment) {
            return console.log("Department not found")  //validation
        }

        console.log("Department updated successfully!")
        const updatedDep = await departModel.findOne({ DepartId: id }) // use the custom key:value and specify request for returning the updated document.  
        return updatedDep;  //return updated value.

    } catch (error) {
        console.log(error + "ERROR IN departBLL PUT REQ")
    }
}

// DELETE - remove department
const removeDepartment = async (id) => {
    try {
        // const customId = {};   //Create an object and contain the custom key:value
        // customId[key] = value;

        const removeDepart = await departModel.findOneAndDelete(id);  //Delete department
        const emps = await getAllDprtsEmps(id)
        const removeFromDprt = await emps.DepartId.deleteMany(id)

        //validation
        if (!removeDepart) {
            return console.log("Department not found")
        }
        else if (!emps) {
            return console.log("Employees not found in --> removeDepartment()")
        }

        //success
        console.log("Department and Employees removed successfully!")
        return { removeDepart, removeFromDprt }  //return deleted department and employees

    } catch (error) {
        console.log(error + "ERROR IN departBLL - DELETE REQ")
    }
}

module.exports = {
    getAllDepartments, getDepartById, getAllDprtsEmps, addDepartment, updateDepartment, removeDepartment
}