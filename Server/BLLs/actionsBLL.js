const jFile = require("jsonfile")
const usersBLL = require("./usersBLL")
const actionsFile = require("../DAL/localFilePath")
const usersModel = require("../database/Mongoose_Modules/User_Schema")


//GET - get all actions from the "actionInfo" JSON file. 
const getAllActions = async () => {
    try {
     const actionObj = await jFile.readFile(actionsFile)
     const { actionsArr } = actionObj;
     return actionsArr
        
    } catch (error) {
      console.log(error + "ERROR IN actionBLL GET REQ -get all actions")
    }

}


//GET -  get last user's action. use to getting user's ID and current actions allowd.
const getLastUserAction = async () => {
    const actionsArr = await getAllActions()
    const currentUserObj = actionsArr.pop();
    return currentUserObj
}

//GET - get all user's actions for presenet on the client side. return an array
const getAllUserActions = async () => {
    const actionsArr = await getAllActions()
    const { id } = await getLastUserAction();
    const userActionsArr = actionsArr.filter(el => el.id === id)
    return userActionsArr;
}

//GET - get the user's actions allowd ---> retuer a number
const getActionsAllowd = async () => {
    const { actionAllowd } = await getLastUserAction()
    return actionAllowd;
}

//PUT - update actions in "actionsInfo" file, and in "Users" collection in DB
const updateActionsAllowd = async () => {
    try {
    //update actions in the "actionsInfo" file

    //get current date
        const dateValue = new Date();
        const currentDate = `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`;

    //get relevant data for creating an object
        const actionsArr = await getAllActions()  //get current all actions
        const lastUserObj = await getLastUserAction() //get last object from actionsArr to get user's data
        let actionAllowd = await getActionsAllowd() //get current user's action allowd. ---> number
        let currentAllowd = actionAllowd - 1    //update users actions

    //create object with updated data
        const updatedActionObj = {
            id: lastUserObj.id,
            date: currentDate,
            maxActions: lastUserObj.maxActions,
            actionAllowd: currentAllowd
        }
    //update "actionsInfo" file
        actionsArr.push(updatedActionObj)   //push the object to the current actionsArr
        await jFile.writeFile(actionsFile, actionsArr)  //updatde file

    //ERROR case
    } catch (error) {
        console.log(error + "ERROR IN actionBLL PUT REQ - update actions to JSON file")
    }

    
    try {
    //update Users collection in the data Base
        const userId = lastUserObj.id  //get user id 
        const updateUserDB = { EmpId: userId, ActionsRemains: currentAllowd }  //Create an object contains the last actions remains
        const customId = { EmpId: userId };   //Create an object contains a customId --> key:value

        const updateAction = await usersModel.findOneAndUpdate(customId, updateUserDB);  //Update User's actions remains

    //validation
        if (!updateAction) {
            return console.log("User not found")
        }
        console.log("user's actions updated successfully!")

    //ERROR case
    } catch (error) {
        console.log(error + "ERROR IN actionBLL PUT REQ - update actions to DB")
    }



}

module.exports = {getAllActions,getLastUserAction,getAllUserActions,getActionsAllowd,updateActionsAllowd}
