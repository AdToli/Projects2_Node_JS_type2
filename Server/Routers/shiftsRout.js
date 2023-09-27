const express = require('express');
const router = express.Router()
const shiftsBLL = require("../BLLs/shiftsBLL")


// localhost:8000/shifts

//GET - get all users or handle querys 
router.get("/", async (req, res) => {
    try {

        //Check if "query" empty. If so ---> return all shifts.
        const queryArr = Object.keys(req.query)
        if (queryArr.length < 1) {
            const shifts = await shiftsBLL.getAllShifts()
            return res.status(200).json({ shifts })
        }

        //Handle querys
        const response = await shiftsBLL.getShiftsByQuery(req.query)

        //validation: if status = true ---> return data. Else print an error message.
        if (response.status !== true) {
            return res.status(404).json(response.data)
        }
        
        return res.status(200).json(response.data)


    } catch (error) {
        return res.status(500).json({ error: "Failed in: shiftsRout ---> GET ---> getAllUsers() OR getShiftsByQuery() " })
    }

})



// POST - create a new shift
router.post("/", async (req, res) => {
    try {
        const newShift = req.body
        const allShifts = await shiftsBLL.getAllShifts()
        const addConfirm = await shiftsBLL.addShift(newEmp)

        //validation
        // if the request body is empty (undefined / null) return status(404)
        if (!req.body) {
           return res.status(404).json({ error: "Please provide a valid body to the request ---> shiftsRout ---> POST" })
        }

        //Added Confirmation:
        //Fail case:
        if (addConfirm.length <= allShifts.length) {
           return res.status(404).json({ error: "FAILED to add shift  ---> shiftsRout --> POST" });
        }
        //Success case: 
       return res.status(200).json(`New shift added! Current shifts list:\n ${addConfirm}`)

    } catch (error) {
       return res.status(500).json({ error: "Failed in: shiftsRout ---> POST ---> addShift()" })
    }
})


// PUT - update shifts detais and menage employees
router.put("/:ExId", async (req, res) => {
    try {
        const { ExId } = req.params
        const newData = req.body

        //validation
        const shift = await shiftsBLL.getShiftByIdOrName(ExId)
        if (!req.body) {           // ---> if the request body is empty (undefined / null) return status(404)
            return res.status(404).json({ error: "Please provide a valid body to the request --> shiftsRout --> PUT \n" })
        }
        else if (!shift) {   //---> right ID ?

            return res.status(404).json({ error: "Shift not found --> shiftsRout --> PUT \n" })
        }

        const updatedDprt = await shiftsBLL.updateShift(ExId, newData)
        return res.status(200).json(`Old details:\n ${shift} \n New details:\n ${updatedDprt} \n`);

    } catch (error) {
        return res.status(500).json({ error: "Failed in: shiftsRout --> PUT --> updateDepartment()\n" })
    }
})


// // DELETE - 
router.delete("/:ExId", async (req, res) => {
    try {

        return res.status(405).json({ error: "Shifts collection can be deleted only directly from DB." })
    }
    catch (error) {
        return res.status(500).json({ error: "Failed in: usersRout --> DELETE --> deleteUser()" })
    }
})
module.exports = router
