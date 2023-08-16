const usersModel = require("../database/Mongoose_Modules/User_Schema")
const loginBLL = require("./loginBLL")
const actionsBLL = require("./actionsBLL")


//GET - get all users  from DB
const getAllUsers = async () => {
    try {
        return await usersModel.find({})
    } catch (error) {
        return {error: error}
    }

}

//GET - get user from DB by external ID
const getUserById = async (id) => {
    try {
        const user = await usersModel.findOne({ EmpId: id })
        return user;
    } catch (error) {
        return {error: error};
    }

}

module.exports = { getAllUsers, getUserById }

// “Users” Page
// This page has a table with all users data (can NOT be changed or deleted).
//Each row presents the user name. maximum actions allowed, and the CURRENT actions allowed today.

