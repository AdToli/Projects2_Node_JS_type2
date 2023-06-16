
const jFile = require("jsonfile")
const usersBLL = require("./usersBLL")

const getActions = async (id) => {
    usersData = await usersBLL().getAllUsers
    const actions = await jFile.readFile(actionsFile)
    return actions
}
const getActionsById = async (id) => {
    const actions = await jFile.readFile(actionsFile)
    const actionArr = actions.map(el => el.id === id)
    return actionArr;
}
const updateUserAction = async (actionsObj) => {
    const actions = await getActions() // - current array of persons
    actions.push(actionsObj)
    return jFile.writeFile(actionsFile, actions)
}

module.exports = { getActions, getActionsById,updateUserAction }