//GET - check if username  & email validity infront the Web Service for login
const wsObj = require("../DAL/wsDAL")
const actionsFile = require("../DAL/localFilePath")
const jFile = require("jsonfile")
const usersBLL = require("./usersBLL")

//PUT - update current user to the action JSON file if login succeed.
const updateUserInActionFile = async (userId) => {
    try {

//get cuurent user's data by ID
        const userData = await usersBLL.getUserById(userId);
        const { ActionsAssign } = userData;

//get current date
        const dateValue = new Date();
        const currentDate = `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`;

//create the object for the actions's JSON file.
        const loginObj = {
            id: userId,
            date: currentDate,
            maxActions: ActionsAssign,
            actionAllowd: ActionsAssign
        }

//get current "actions" from "actionsInfo" file, and add the current "loginObj"
        const actionObj = await jFile.readFile(actionsFile)
        const { actionsArr } = actionObj;
        actionsArr.push(loginObj)

//update "actionsInfo" file 
        jFile.writeFile(actionsFile, actionsArr)
        return console.log("User added to JSON successfully")
//ERROR case        
    } catch (error) {
        console.log(error + "ERROR IN loginBLL PUT REQ - update user to the JSON file after login")

    }


}

//GET - 1. get user's input, and verify against username & email of the REST API. 2. checkup user's actions credit. If all true --> return userId
const loginUser = async (loginData) => {
    try {
//verify username & email
        let validation = false
        let userId;
        await wsObj.forEach(el => {
            if (el.username === loginData.username && el.email === loginData.email) {
                validation = true;
                userId = el.id
            }
        });

//if verified, check user's actions limit. 
        if (validation) {           
            const userData = await usersBLL.getUserById(userId);
            const { ActionsRemains } = userData;
            if (ActionsRemains <= 0){
                return "Max acctions for today. Please try again tommorow"
            }

//if there is credit, update users login in JSON file, and return his ID. 
            await updateUserInActionFile(userId)
            alert("connected!")
            return userId;
        }

//if verified failed
        console.log("ERROR ON 'loginBLL'")
        return "Incorrect email or username";

//ERROR case
    } catch (error) {
        console.log(error + "ERROR IN loginBLL GET REQ")
    }

}

module.exports = { loginUser, updateUserInActionFile }

