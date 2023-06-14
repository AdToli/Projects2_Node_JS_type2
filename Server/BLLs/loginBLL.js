//GET - check if username  & email validity infront the Web Service for login
const wsObj = require("../DAL/wsDAL")

const loginUser = async (loginData) => {
    let validation = false
    let userId;
    await wsObj.forEach(el => {
        if (el.username === loginData.username && el.email === loginData.email) {
            validation = true;
            userId = el.id
        }
    });
    if (validation) {
        return userId;
    }
    console.log("ERROR ON 'loginBLL'")
    return "Incorrect email or username";
}

module.exports = { loginUser }