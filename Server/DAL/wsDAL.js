const axios = require("axios");

const wsAddress = "https://jsonplaceholder.typicode.com/users"

const usersDAL = async()=>{
    const {data} = await axios.get(wsAddress)
    return data;
}

module.exports = { usersDAL }