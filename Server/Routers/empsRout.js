const express = require('express');
const router = express.Router()
const empsBLL = require("../BLLs/empsBLL")


// localhost:8000/employees

//GET - get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await empsBLL.getAllEmployees()
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({ error: "Failed in: empsRout --> GET--> getAllEmployees()" })
    }

})

// GET - 
router.get("/:EmpId", async (req, res) => {
    try {
        const { EmpId } = req.params
        const employee = await empsBLL.getEmpById(EmpId)

        //validation
        if (!employee) { res.status(404).json("employee not found --> empsRout --> GET -->getEmpById()") }  //--> right ID ?
        res.status(200).json(employee)

    } catch (error) {
        res.status(500).json({ error: "Failed in: empsRout --> GET --> getEmpById() " })
    }

})
// POST - 
router.post("/", async (req, res) => {
    try {
        const newEmp = req.body
        const allEmps = await empsBLL.getAllEmployees()
        const status = await empsBLL.addEmployee(newEmp)

        //validation
        // if the request body is empty (undefined / null) return status(404)
        if (!req.body) {
            res.status(404).json("Please provide a valid body to the request --> empsRout --> POST")
        }
        // employee added? 
        if (status.length <= allEmps.length) {
            res.status(404).json("FAILED to add employee  --> empsRout --> POST");
        }
        res.status(200).json(`New employee added! Current employees list:\n ${status}`)

    } catch (error) {
        res.status(500).json({ error: "Failed in: empsRout --> POST --> addEmployee()" })
    }
})


// PUT - 
router.put("/:EmpId", async (req, res) => {
    try {
        const { EmpId } = req.params
        const newData = req.body

        //validation
        const employee = await empsBLL.getEmpById(EmpId)
        if (!req.body) {           // ---> if the request body is empty (undefined / null) return status(404)
            res.status(404).json("Please provide a valid body to the request --> empsRout --> PUT \n")
        }
        else if (!employee) {   //---> right ID ?

            res.status(404).json("employee not found --> empsRout --> PUT \n")
        }

        const updatedDprt = await empsBLL.updateEmployee(EmpId, newData)
        res.status(200).json(`Old details:\n ${employee} \n New details:\n ${updatedDprt} \n`);

    } catch (error) {
        res.status(500).json("Failed in: empsRout --> PUT --> updateDepartment()\n")
    }
})


// DELETE - 
router.delete("/:EmpId", async (req, res) => {
    try {
        const { EmpId } = req.params

        //validation
        const employee = await empsBLL.getEmpById(EmpId)
        if (!employee) {        //---> right ID ?
            res.status(404).json("Employee not found --> empsRout --> DELETE \n")
        }

        const status = await empsBLL.removeEmployee(EmpId)
        res.status(200).json(status)

    } catch (error) {
        res.status(500).json({ error: "Failed in: empsRout --> DELETE --> removeEmployee()" })
    }
})
module.exports = router