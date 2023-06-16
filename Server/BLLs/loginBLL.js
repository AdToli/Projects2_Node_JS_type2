//GET - check if username  & email validity infront the Web Service for login
const wsObj = require("../DAL/wsDAL")
const actionsFile = require("../DAL/localFilePath")
const jFile = require("jsonfile")
const usersBLL = require("./usersBLL")


const updateUserInActionFile = async (userId)=>{
const userData = await usersBLL.getUserById(userId);
const {ActionsAssign} = userData;

jFile.writeFile(actionsFile, actions)
}

//GET - get user's input, and verify it against username & email of the REST API. return current user ID.
const loginUser = async (loginData) => {
    try {
        let validation = false
        let userId;
        await wsObj.forEach(el => {
            if (el.username === loginData.username && el.email === loginData.email) {
                validation = true;
                userId = el.id
            }
        });
        if (validation) {
            alert("connected!")
            return userId;
        }
        console.log("ERROR ON 'loginBLL'")
        return "Incorrect email or username";
    } catch (error) {
        console.log(error + "ERROR IN loginBLL GET REQ")
    }

}

module.exports = { loginUser }