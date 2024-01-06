const employeeSchema = require("../model/managerModel");
// Create
const CreateEmployee = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        if (!email || !name) {
            return res.status(400).json({ error: "All Fields are mandatory fields" });
        }
        let images;
        if (req.file) {
            images = req.file.filename;
        }
        const create = await employeeSchema.create({ email, name, images });
        res.status(201).json({ success: true, data: create });
    } catch (err) {
        next(err);
    }
};


module.exports = { CreateEmployee, getEmployee };