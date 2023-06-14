const departModel = require("../database/Mongoose_Modules/Department_Schema")



//GET - get all departments
const getAllDepartments = async () => {
    return await departModel.find({})
}

// GET - get department by exernal ID
const getDepartById = async (id) => {
    const department = await departModel.findOne({ DepartId: id })
    return department;  
}

//get
getAllDeparEmps  

// POST - create a new Department doucument
const addDepartment = async (depObj) => {
    const department = new departModel(depObj)
    await department.save()
    const allDepartments = await getAllDepartments() //for updating client present
    return allDepartments
}
// PUT - update department details useing custom key:value
const updateDepartment = async (key, value, depDeta) => {
    try {
        const customId = {};   //Create an object and contain the custom key:value
        customId[key] = value;


        const newDepartment = await departModel.findOneAndUpdate(customId, depDeta);  //Update Department details


        if (!newDepartment) {
            return console.log("Department not found")  //validation
        }


        console.log("Department updated successfully!")
        const updatedDep = await departModel.findOne({ customId }) // use the custom key:value and specify request for returning the updated document.  
        return updatedDep;  //return updated value.

    } catch (error) {
        console.log(error + "ERROR IN departBLL PUT REQ")
    }
}

// DELETE - remove department
const removeDepartment = async (key, value,) => {
    try {
        const customId = {};   //Create an object and contain the custom key:value
        customId[key] = value;

        const removeDepart = await departModel.findOneAndDelete(customId);  //Delete department

        if (!removeDepart) {
            return console.log("Department not found")  //validation
        }
        console.log("Department removed successfully!")
        return removeDepart  //return deleted department

    } catch (error) {
        console.log(error + "ERROR IN departBLL DELETE REQ")
    }
}