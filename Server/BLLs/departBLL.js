const departModel = require("../database/Mongoose_Modules/Department_Schema")
const empsModel = require("../database/Mongoose_Modules/Employee_Schema")
const empsBLL = require("./empsBLL")


//GET - get all departments
const getAllDepartments = async () => {
    try {
        const allDeparts = await departModel.find({});
        return allDeparts;
    } catch (error) {
        return { error: error };
    }

}

// GET - get department by exernal ID
const getDepartById = async (id) => {
    try {
        const department = await departModel.findOne({ DepartId: id });
        return department;
    } catch (error) {
        return { error: error };
    }

}

// GET - get all employees of some department
const getAllDprtsEmps = async (id) => {
    try {
        const allEmps = await empsBLL.getAllEmployees();
        const departEmps = allEmps.filter(empDepart => empDepart.DepartId == id);
        return departEmps;
    } catch (error) {
        return { error: error };
    }

}

// POST - create a new Department doucument
const addDepartment = async (depObj) => {
    try {
        const department = new departModel(depObj);
        await department.save();

        const allDepartments = await getAllDepartments(); //for updating client present
        return allDepartments
    } catch (error) {
        return { error: error };
    }

}
// PUT - update department details
const updateDepartment = async (id, depData) => {
    try {
        const newDepartment = await departModel.findOneAndUpdate({ DepartId: id }, depData, { new: true });  //Update Department details
        return { newDepartment };  //return updated department.

    } catch (error) {
        return { error: error };
    }
}


// DELETE - delete department & remove all employees related to the department 
const removeDepartment = async (id) => {

    // remove employees from deleted department implementation
    async function removeEmpsFromDprt(departId) {
        try {
            const result = await empsModel.updateMany(
                { DepartId: departId }, // Filter criteria
                { $set: { DepartId: 0 } } // Update operation
            );
            return result;
        } catch (error) {
            return { error: error };
        }
    }

    try {
        const dprtToRmove = await departModel.findOneAndDelete({ DepartId: id });  //Delete department
        const isRemoved = await removeEmpsFromDprt(id); //remove the department from the related employees collections.
        const deprtEmps = await getAllDprtsEmps(id);  //get all employees related to the department.
        //validation ---> deletion successful ? 
        if (!dprtToRmove && !isRemoved) {
            throw new Error("Department Deletion falied & Failed to remove the department ID from the related employees collections.");
        }
        else if (!dprtToRmove) {
            throw new Error("Department Deletion falied.");
        }
        else if (!isRemoved) {
            throw new Error("Falied to remove the department from the related employees collections.");
        }
        else {
            console.log("Deletion Successfull\n");
            return { status: true, DeletedDepart: dprtToRmove, ReletedEmps: deprtEmps }; //return deleted department and updated employees collection.
        }

    } catch (error) {
        return { error: error };
    }
}

module.exports = {
    getAllDepartments, getDepartById, getAllDprtsEmps, addDepartment, updateDepartment, removeDepartment
}