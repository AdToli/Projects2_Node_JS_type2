const express = require("express")
require("./database/configDB")

const app = express()
const port = 8000

// Middlewares
// will parse every json from req.body onto a JS object
app.use(express.json())

// localhost:8000/departments
const departRouter = require("./Routers/departRout")
app.use("/departments", departRouter)

// localhost:8000/employees
const empsRouter = require("./Routers/empsRout")
app.use("/employees", empsRouter)

// localhost:8000/shifts
const shiftsRouter = require("./Routers/shiftsRout")
app.use("/shifts", shiftsRouter)

// localhost:8000/users
const usersRouter = require("./Routers/usersRout")
app.use("/users", usersRouter)



app.listen(port, () => {
    console.log("Server is running on port " + port);
})
