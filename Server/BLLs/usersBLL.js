const usersModel = require("../database/Mongoose_Modules/User_Schema")
const loginBLL = require("./loginBLL")
const actionsBLL = require("./actionsBLL")


//GET - get all users  from DB
const getAllUsers = async () => {
    return await usersModel.find({})
}

//GET - get users user  from DB by external ID
const getUserById = async (id) => {
    try {
        const user = await usersModel.findOne({ EmpId: id })
        return user;
    } catch (error) {
        console.log(error + "ERROR IN usersBLL GET by id REQ- can't find user?")
    }

}

// “Users” Page
// This page has a table with all users data (can NOT be changed or deleted).
//Each row presents the user name. maximum actions allowed, and the CURRENT actions allowed today.


//GET - Current user ID for global usege.
// const idPromise = new Promise = (res, rej) => {
//     if (loginUser().validation){
//     const userId = loginUser().userId
//         res(userId);
//     }else {
//         rej(new Error("Email or Username incorrect"))
//     }
// }
