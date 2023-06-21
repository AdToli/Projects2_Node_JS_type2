const express = require('express');
const router = express.Router()
const departBLL = require("../BLLs/departBLL")


// localhost:8000/depart

//GET - get all departments
router.get("/", async (req, res) => {
    try {
        const departments = await departBLL.getAllDepartments()
        res.status(200).json(departments)
    } catch (e) {
        res.status(500).json({ error: "Failed in: departRotuer --> GET--> getAllDepartments()" })
    }

})

// GET - get department by exernal ID & all employees of it.
router.get("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params
        const department = await departBLL.getDepartById(DepartId)
        console.log(department)

        if (!department) res.status(404).json({ msg: "departments not found" }) //validation --> right ID ?

        const emps = await departBLL.getAllDprtsEmps(DepartId) //get all emps
        console.log(emps);
        const dprtNemps = { department, emps }

        res.status(200).json(dprtNemps)
    } catch (e) {
        res.status(500).json({ error: "Failed in: departRotuer --> GET --> getDepartById() " })
    }

})

// POST - create a new Department doucument
router.post("/", async (req, res) => {
    try {
        const newDepart = req.body
        const validation = await departBLL.getAllDepartments()
        const status = await departBLL.addDepartment(newDepart)

        status.length <= validation.length ? console.log("New department added!") : console.log("FAILED to add depratment"); //validation --> department added? 

        res.status(200).json(status)

    } catch (error) {
        res.status(500).json({ error: "Failed in: departRotuer --> POST --> addDepartment()" })
    }
})

// PUT - update department details using custom key:value
router.put("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params
        const newData = req.body

        //validation
        if (!req.body) res.status(400).json({ erro: "Please provide a body to the request" }) // if the request body is empty (undefined / null) return status(400)

        const updtedDprt = await departBLL.updateDepartment(DepartId, newData)
        res.status(200).json(updtedDprt);
    } catch (error) {
        res.status(500).json({ error: "Failed in: departRotuer --> PUT --> updateDepartment()" })
    }
})


// DELETE - remove department & employees association
router.delete("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params
        const status = await departBLL.removeDepartment(DepartId)
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: "Failed in: departRotuer --> DELETE --> removeDepartment()" })
    }
})