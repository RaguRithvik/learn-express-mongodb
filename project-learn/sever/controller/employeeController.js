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
    try {
        if (!email || !name) {
            return res.status(400).json({ message: "All Fields are mandatory fields" });
        }
        const emailTaken = await employeeSchema.findOne({ email });
        if (emailTaken) {
            return res.status(400).json({ message: "Email Already Taken" });
        }
        const images = req.files['images'][0]?.filename;
        const documents = req.files['documents'][0]?.filename;
        const parsedSkills = JSON.parse(skills);
        const create = await employeeSchema.create({ email, name, images, documents, skills: parsedSkills });
        return res.status(201).json({ success: true, data: create });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error creating employee", details: err.message });
    }
};


module.exports = { getEmployee, createEmployee };