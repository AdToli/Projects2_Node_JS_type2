const usersModel = require("../database/Mongoose_Modules/User_Schema")
const empsBLL = require("./empsBLL")
const { addEmployee } = require("./shiftsBLL")



//GET 
const getAllUsers = async () => {
    return await usersModel.find({})
}
//get
getActionFile

//POST 
const createUser = async (id) => {
    const allEmps = await empsBLL.getAllEmployees();
    const allUsers = await getAllUsers();
    const empsArr = Object.values(allEmps);
    const usersArr = Object.values(allUsers);

    const newUserData = empsArr.filter(employee => employee.EmpId===id)

    let isExist = false;
    for (let i = 0; i < usersArr.length; i++) {
        isExist = usersArr.some(idKey => idKey.EmpId === empsArr.EmpId)
        if (isExist) return isExist
    }

    if (isExist) {
        console.log("user already exist!")
        return "user already exist!"
    }
}

// “Users” Page
// This page has a table with all users data (can NOT be changed or deleted).
//Each row presents the user name. maximum actions allowed, and the CURRENT actions allowed today.