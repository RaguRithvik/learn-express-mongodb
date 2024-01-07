const employeeSchema = require("../model/employeeModel");
// get
const getEmployee = async (req, res, next) => {
    try {
        const getData = await employeeSchema.find();
        res.status(200).json({ success: true, records: getData });
    } catch (err) {
        next(err);
    }
};
// Create
const createEmployee = async (req, res, next) => {
    const { email, name, skills } = req.body;
    console.log(req.body)
    try {
        if (!email || !name) {
            return res.status(400).json({ message: "All Fields are mandatory fields" });
        }

        const emailTaken = await employeeSchema.findOne({ email });
        if (emailTaken) {
            res.status(400);
            throw new Error("Email Already Taken");
        }

        let images, documents;

        const create = await employeeSchema.create({ email, name, images, documents, skills });
        res.status(201).json({ success: true, data: create });
        
    } catch (err) {
        next(err);
    }
};

module.exports = { getEmployee, createEmployee};