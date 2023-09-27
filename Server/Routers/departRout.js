const express = require('express');
const departBLL = require("../BLLs/departBLL")
const router = express.Router()

// localhost:8000/departments

//GET - get all departments
router.get("/", async (req, res) => {
    try {
        const departments = await departBLL.getAllDepartments()
        return res.status(200).json(departments)
    } catch (error) {
        return res.status(500).json({ error })
    }

})

// GET - get department by exernal ID & all its employees .
router.get("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params

        //validation --> good request?
        if (!DepartId) {
            return res.status(400).json("Bad request. Please try again")
        }
        const department = await departBLL.getDepartById(DepartId) //get the department
        const emps = await departBLL.getAllDprtsEmps(DepartId) //get all employees of the department

        //validation --> right details?
        if (!department) {
            return res.status(404).json("Department not found")
        }
        if (emps.length <= 0) {
            return res.status(404).json("Employees not found")
        }

        //success
        const dprtAndemps = { department, emps }
        return res.status(200).json(dprtAndemps)

    } catch (error) {
        return res.status(500).json({ error })
    }

})

// POST - create a new Department doucument
router.post("/", async (req, res) => {
    try {
        //validation  --> good body?
        if (!req.body) {
            return res.status(400).json("Please provide a valid data to the request")
        }

        const newDepart = req.body
        const allDeparts = await departBLL.getAllDepartments()
        const isAdded = await departBLL.addDepartment(newDepart)


        //validation  --> department added? 
        if (isAdded.length <= allDeparts.length || allDeparts.length <= 0) {
            return res.status(404).json("FAILED to add depratment");
        }

        //success
        return res.status(201).json({ msg: "New department added!", isAdded })

    } catch (error) {
        return res.status(500).json({ error })
    }
})


// PUT - update department details using external ID
router.put("/:DepartId", async (req, res) => {
    try {
        //validation ---> bad request
        if (!req.body || !req.params) {
            return res.status(400).json("Please provide a valid data to the request")
        }

        const { DepartId } = req.params;
        const newData = req.body;
        const department = await departBLL.getDepartById(DepartId);
        const updatedDprt = await departBLL.updateDepartment(DepartId, newData)

        //validation ---> right ID? (is department exsist?) & valid model?
        if (!department || !updatedDprt) {
            return res.status(404).json({ error: "Department update Failed. Please check the provided data " });
        }

        //success
        return res.status(201).json({ Old: department, Updated: updatedDprt });

    } catch (error) {
        return res.status(500).json({ error })
    }
})


// DELETE - remove department & employees association using external ID
router.delete("/:DepartId", async (req, res) => {
    try {
        //validation ---> bad request
        if (!req.params) {
            return res.status(400).json("Please provide a valid data to the request")
        }
        const { DepartId } = req.params

        const isDeleted = await departBLL.removeDepartment(DepartId)

        //validation ---> deletion successful?
        if (isDeleted.status !== true) {
            return res.status(404).json({ error: "Deletion failed" })
        }
        
        //success
        return res.status(200).json(isDeleted);

    } catch (error) {
        return res.status(500).json({ error })
    }
})

module.exports = router