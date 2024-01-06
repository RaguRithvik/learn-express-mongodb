const managerschema = require("../model/managerModel");
// get
const getManager = async (req, res, next) => {
    console.log("req");
    try {
        const getData = await managerschema.find();
        res.status(200).json({ success: true, records: getData });
    } catch (err) {
        next(err);
    }
};
// Create
const CreateManager = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        if (!email || !name) {
            return res.status(400).json({ error: "All Fields are mandatory fields" });
        }
        const emailTaken = await managerschema.findOne({ email });
        if (emailTaken) {
            res.status(400);
            throw new Error("Email Already Taken");
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
// get
const deleteManager = async (req, res, next) => {
    const { id } = req.body
    try {
        const deletedData = await managerschema.deleteOne({ _id: id });
        if (deletedData.deletedCount === 1) {
            res.status(200).json({ success: true, message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'ID not found' });
        }
    } catch (err) {
        next(err);
    }
};
module.exports = { CreateManager, getManager, deleteManager };
