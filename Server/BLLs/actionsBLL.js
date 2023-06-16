const jFile = require("jsonfile")
const usersBLL = require("./usersBLL")
const actionsFile = require("../DAL/localFilePath")


//GET - 
const getAllActions = async () => {
    const actionObj = await jFile.readFile(actionsFile)
    const { actionsArr } = actionObj;
    return actionsArr
}


//GET - 
const getLastUserAction = async () => {
    const actionsArr = await getAllActions()
    const currentUserObj = actionsArr.pop();
    return currentUserObj
}

//GET - 
const getAllUserActions = async () => {
    const actionsArr = await getAllActions()
    const { id } = await getLastUserAction();
    const userActionsArr = actionsArr.filter(el => el.id === id)
    return userActionsArr;
}

//GET - 
const getActionsAllowd = async () => {
    const { actionAllowd } = await getLastUserAction()
    return actionAllowd;
}

//PUT -
const updateActionsAllowd = async (event) => {

//get current date
    const dateValue = new Date();
    const currentDate = `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`;

    const actionsArr = await  getAllActions()
    const lastUserObj = await getLastUserAction()
    let actionAllowd = await getActionsAllowd()
    let currentAllowd = actionAllowd - 1

    const updatedActionObj = {
        id: lastUserObj.id,
        date: currentDate,
        maxActions: lastUserObj.maxActions,
        actionAllowd: currentAllowd
    }
    actionsArr.push(updatedActionObj)
    jFile.writeFile(actionsFile, actionsArr)

    
}

module.exports = {}