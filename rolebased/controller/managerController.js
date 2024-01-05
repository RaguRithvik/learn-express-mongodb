const managerschema = require("../model/managerModel");
// Create
const CreateManager = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        if (!email || !name) {
            return res.status(400).json({ error: "All Fields are mandatory fields" });
        }
        let images;
        if (req.file) {
            images = req.file.filename;
        }
        const create = await managerschema.create({ email, name, images });
        res.status(201).json({ success: true, data: create });
    } catch (err) {
        next(err);
    }
};

module.exports = { CreateManager };
