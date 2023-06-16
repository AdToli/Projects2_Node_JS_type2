const path = require("path")
const file = path.join(__dirname, "../localData/actionsInfo.json") 

const getAddress = ()=>{
    return file
}
module.exports ={getAddress}

