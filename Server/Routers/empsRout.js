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
        res.status(500).json({ error })
    }

})

// GET -  employee by exernal ID
router.get("/:EmpId", async (req, res) => {
    try {
        const { EmpId } = req.params
        //validation --> good request?
        if (!EmpId) {
            return res.status(400).json("Bad request. Please try again")
        }
        const employee = await empsBLL.getEmpById(EmpId) //get the employee

        //validation --> right ID ?
        if (!employee) {
            return res.status(404).json("Employee not found")
        }

        //success
        return res.status(200).json(employee)

    } catch (error) {
        return res.status(500).json({ error: "Failed in: empsRout --> GET --> getEmpById() " })
    }

});



// POST - create a new Employee doucument
router.post("/", async (req, res) => {
    try {

        //validation
        // if the request body is empty (undefined / null) return status(404)
        if (!req.body) {
            return res.status(400).json("Please provide a valid data to the request")
        }

        const newEmp = req.body
        const allEmps = await empsBLL.getAllEmployees()
        const status = await empsBLL.addEmployee(newEmp)

        // employee added?
        if (status.length <= allEmps.length || allEmps.length <= 0) {
            return res.status(404).json("FAILED to add employee");
        }

        //success
        return res.status(201).json(`New employee added! Current employees list:\n ${status}`)

    } catch (error) {
        return res.status(500).json({ error: "Failed in: empsRout --> POST --> addEmployee()" })
    }
})


// // PUT - update employee details using external ID
router.put("/:EmpId", async (req, res) => {
    try {

        const { EmpId } = req.params;
        const newData = req.body;
        const employee = await empsBLL.getEmpById(EmpId)

        //validation
        if (!req.body || !req.params || !employee) {   // ---> if the request is empty (undefined / null) return status(404)
            return res.status(400).json("Please provide a valid data to the request \n");
        }

        //success
        const updatedEmp = await empsBLL.updateEmployee(EmpId, newData);

        return res.status(201).json({ Old: employee, Updated: updatedEmp });

    } catch (error) {
        return res.status(500).json({ error })
    }
})


// DELETE - remove employee using external ID
router.delete("/:EmpId", async (req, res) => {
    try {

        //validation ---> bad request
        if (!req.params) {
            return res.status(400).json("Please provide a valid data to the request")
        }

        const { EmpId } = req.params

        const isDeleted = await empsBLL.removeEmployee(EmpId)

        //validation ---> deletion successful?
        if (isDeleted.status !== true) {
            return res.status(404).json({ error: "Deletion failed" })
        }

        //success
        return res.status(200).json(isDeleted);

    } catch (error) {
        return res.status(500).json({ error: "Failed in: empsRout --> DELETE --> removeEmployee()" })
    }
})



module.exports = router