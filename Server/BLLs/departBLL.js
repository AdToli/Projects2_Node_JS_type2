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
// PUT - update department details
const updateDepartment = async (id, depData) => {
    try {

        const newDepartment = await departModel.findOneAndUpdate({ DepartId: id }, depData);  //Update Department details

        //validation
        if (!newDepartment) { //---> right ID ?
            return console.log("Somthing went wrong :/ ---> PUT departBLL")
        }

        console.log("\n Department updated successfully! \n")
        const updatedDep = await departModel.findOne({ DepartId: id }) // use external ID for returning the updated document.  
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

        const deprtEmps = await getAllDprtsEmps(id)
        try {
            await empsBLL.removeEmpsFromDprt(id) //remove the department ID from employees "DepartId". 

        } catch (error) {
            return(error + " \n ERROR IN departBLL - DELETE REQ - removeEmpsFromDprt()")
        }
        const DprtToRmove = await departModel.findOneAndDelete({ DepartId: id });  //Delete department

        //success
        console.log("Successfull to remove the employees, and delete the department.\n")
        return (`Department removed: \n ${DprtToRmove},\n The employees were updated:\n ${deprtEmps}\n`)  //return deleted department and updated employees

    } catch (error) {
        console.log(error + " \n ERROR IN departBLL - DELETE REQ")
    }
}

module.exports = {
    getAllDepartments, getDepartById, getAllDprtsEmps, addDepartment, updateDepartment, removeDepartment
}