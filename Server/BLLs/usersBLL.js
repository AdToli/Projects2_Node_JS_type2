const usersModel = require("../database/Mongoose_Modules/User_Schema")
const loginBLL = require("./loginBLL")
const actionsBLL = require("./actionsBLL")


//GET - Current user ID for global usege. 
// const idPromise = new Promise = (res, rej) => {
//     if (loginUser().validation){
//     const userId = loginUser().userId
//         res(userId);
//     }else {
//         rej(new Error("Email or Username incorrect"))
//     }
// }


//GET - get all users  from DB
const getAllUsers = async () => {
    return await usersModel.find({})
}
//GET - get user data from DB by external ID
const getUserById = async (id) => {
    try {
        const user = await usersModel.findOne({ EmpId: id })
        return user;
    } catch (error) {
        console.log(error + "ERROR IN usersBLL GET by id REQ- can't find user?")
    }

}
//GET - user JSON file 
const getUserActions = async () => {
    const currentUserId = await loginBLL()
    if (currentUserId === false) {
        return "Incorrect email or username";
    }
    try {
        const user = await getUserById(currentUserId);
        const userActions = await actionsBLL.getActions(currentUserId)
        return userActions

    } catch (error) {
        console.log(error + "ERROR IN userBLL GET - user action REQ")

    }

}

//POST - update actions JSON file 
const updateActionFile = async () => {

    //check-up and find user ID
    const currentUserId = await loginBLL()
    if (currentUserId === false) {
        return "Incorrect email or username";
    }
    try {
        const user = await getUserById(currentUserId);

        //get current date
        const dateValue = new Date();
        const currentDate = `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`;


        //create the object for the actions's JSON file.
        let i = -1;
        const obj = {
            id: user.EmpId,
            date: currentDate,
            maxActions: user.ActionsAssign,
            actionAllowd: user.ActionsAssign
        }
        await actionsBLL.updateUserAction(obj)

    } catch (error) {
        console.log(error + "ERROR IN userBLL POST - update actions REQ")

    }

}


// “Users” Page
// This page has a table with all users data (can NOT be changed or deleted).
//Each row presents the user name. maximum actions allowed, and the CURRENT actions allowed today.







/*Continue in " 'with_POST_in_users' branch "
POST 
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
*/