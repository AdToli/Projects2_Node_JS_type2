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
        //validation
        if(!ActionsAssign){   // got ActionsAssign?
            console.log(error + "ERROR IN  --> loginBLL --> PUT REQ --> get cuurent user's data by ID")
            return false;
        }

     //get current date
        const dateValue = new Date();
        const currentDate = `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`;
        //validation
        if(!currentDate){   // currentDate exist?
            console.log(error + "ERROR IN  --> loginBLL --> PUT REQ --> get current date")
            return false;
        }

     //create an object for the actions's JSON file.
        const loginObj = {
            id: userId,
            date: currentDate,
            maxActions: ActionsAssign,
            actionAllowd: ActionsAssign
        }

        //validation
        try {
    //get current "actions" from "actionsInfo" file, and add the current "loginObj"
            const actionObj = await jFile.readFile(actionsFile)
            const { actionsArr } = actionObj;
            actionsArr.push(loginObj)
    
    //update "actionsInfo" file 
            await jFile.writeFile(actionsFile, actionsArr)
            console.log("User added to JSON successfully")
            return  true;

        } catch (error) {
             console.log(error + "ERROR IN  --> loginBLL --> PUT REQ --> get 'actions' / update 'actionsInfo' ")
             return false;
        }
     //ERROR case        
    } catch (error) {
        console.log(error + "ERROR IN --> loginBLL --> PUT REQ ")
        return false;
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

     //if username & email valids 
        //check user's actions limit. 
        if (validation) {
            const userData = await usersBLL.getUserById(userId);
            const { ActionsRemains } = userData;
            if (ActionsRemains <= 0) {
                console.log("Maximun acctions for today. Try again tommorow please \n");
                alert("Maximun acctions for today. Try again tommorow please \n");
                return false
            }

    //if there is credit, update users login in JSON file, and return his ID. 
            const isConnected = await updateUserInActionFile(userId)
            //validation
            if(!isConnected){ //isConnected == false? 
                alert("Something went worng :/ . Please try again.!")
                console.log("ERROR IN --> 'loginBLL --> isConnected = false \n");
                return isConnected;
            } 
            alert("connected!")
            return isConnected;
        }

        //if verified failed
        alert("Incorrect email or username");
        console.log("ERROR IN --> 'loginBLL --> incorrect email or username '")
        return false

        //ERROR case
    } catch (error) {
        console.log(error + "ERROR IN loginBLL GET REQ")
        return false
    }

}

module.exports = { loginUser, updateUserInActionFile }

