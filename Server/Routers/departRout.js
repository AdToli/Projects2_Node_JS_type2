const express = require('express');
const departBLL = require("../BLLs/departBLL")
const router = express.Router()

// localhost:8000/departments

//GET - get all departments
router.get("/", async (req, res) => {
    try {
        const departments = await departBLL.getAllDepartments()
        res.status(200).json(departments)
    } catch (error) {
        res.status(500).json({ error: "Failed in: departRotuer --> GET--> getAllDepartments()" })
    }

})

// GET - get department by exernal ID & all employees of it.
router.get("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params
        const department = await departBLL.getDepartById(DepartId)
        console.log(department)

        if (!department) res.status(404).json("department not found") //validation --> right ID ?

        const emps = await departBLL.getAllDprtsEmps(DepartId) //get all emps
        console.log(emps);
        const dprtNemps = { department, emps }

        res.status(200).json(dprtNemps)
    } catch (error) {
        res.status(500).json({ error: "Failed in: departRotuer --> GET --> getDepartById() " })
    }

})

// POST - create a new Department doucument
router.post("/", async (req, res) => {
    try {
        const newDepart = req.body
        const allDeparts = await departBLL.getAllDepartments()
        const status = await departBLL.addDepartment(newDepart)

        //validation
        // if the request body is empty (undefined / null) return status(404)
        if (!req.body) {
            res.status(404).json("Please provide a valid body to the request")
        }
        // department added? 
        if (status.length <= allDeparts.length) {
            res.status(404).json("FAILED to add depratment");
        }
        res.status(200).json(`New department added! current departments list:\n ${status}`)

    } catch (error) {
        res.status(500).json({ error: "Failed in: departRotuer --> POST --> addDepartment()" })
    }
})

// PUT - update department details using custom external ID
router.put("/:DepartId", async (req, res) => {
    try {
        //validation ---> bad request
        if (!req.body || !req.params || typeof req.body === 'string' || typeof req.params === 'string') {           // ---> if the request body is empty (undefined / null) return status(400)
            return res.status(400).json("Please provide a valid data to the request")
        }

        const { DepartId } = req.params
        const newData = req.body
        const department = await departBLL.getDepartById(DepartId)

        //validation ---> //---> right ID ?
        if (!department) {
            return res.status(404).json({ error: "department not found" })
        }

        const updatedDprt = await departBLL.updateDepartment(DepartId, newData)
        return res.status(200).json({ Old: department, Updated: updatedDprt });

    } catch (error) {
        return res.status(500).json(error)
    }
})



// DELETE - remove department & employees association using custom external ID
router.delete("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params
        const status = await departBLL.removeDepartment(DepartId)

        //validation
        if (!status) { // right ID ?
            res.status(404).json("Department not found")
        }

        res.status(200).json(status);

    } catch (error) {
        res.status(500).json({ error: "Failed in: departRotuer --> DELETE --> removeDepartment()" })
    }
})

module.exports = router