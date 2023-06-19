const express = require('express');
const router = express.Router()
const departBLL = require("../BLLs/departBLL")

// localhost:8000/movies/43534534534
router.get("/", async (req, res) => {
    try {
        const departments = await departBLL.getAllDepartments()
        res.status(200).json(departments)
    } catch (e) {
        res.status(500).json({error:"Failed in: departRotuer --> getAllDepartments()" })
    }

})

