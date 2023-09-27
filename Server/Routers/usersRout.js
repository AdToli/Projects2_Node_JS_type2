const express = require('express');
const router = express.Router()
const usersBLL = require("../BLLs/usersBLL")


// localhost:8000/users

//GET - get all users
router.get("/", async (req, res) => {
    try {
        const users = await usersBLL.getAllUsers()
        return res.status(200).json({ users })
    } catch (error) {
        return res.status(500).json({ error: "Failed in: usersRout --> GET--> getAllUsers()" })
    }

})

// GET - user by id
router.get("/:EmpId", async (req, res) => {
    try {
        const { EmpId } = req.params
        const user = await usersBLL.getUserById(EmpId)

        //validation 
        if (!user) { 
            return res.status(404).json({ error: "user not found --> usersRout --> GET --> getUserById()" })
        }  
        return res.status(200).json({ user })

    } catch (error) {
        return res.status(500).json({ error: "Failed in: usersRout --> GET --> getEmpById() " })
    }

})

// // POST - 
router.post("/", async (req, res) => {
    try {

        return res.status(405).json({ error: "Users collection can be change directly from DB or server side only." })
    }
    catch (error) {
        return res.status(500).json({ error: "Failed in: usersRout --> POST --> addUser()" })
    }
})


// // PUT - 
router.put("/:EmpId", async (req, res) => {
    try {

        return res.status(405).json({ error: "Users collection can be updated directly from DB only." })
    }
    catch (error) {
        return res.status(500).json({ error: "Failed in: usersRout --> PUT --> updateUser()" })
    }
})


// // DELETE - 
router.delete("/:EmpId", async (req, res) => {
    try {

        return res.status(405).json({ error: "Users collection can be deleted directly from DB only." })
    }
    catch (error) {
        return res.status(500).json({ error: "Failed in: usersRout --> DELETE --> deleteUser()" })
    }
})
module.exports = router