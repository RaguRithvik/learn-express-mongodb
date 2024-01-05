const restAPI = require("../model/restAPIModal")
const getAPI = async (req, res) => {
    const data = await restAPI.find()
    res.status(200).json(data)
}
const createAPI = async (req, res) => {
    const { name, profession } = req.body
    const create = await restAPI.create({ name, profession })
    if (!name || !profession) {
        res.status(400)
        throw new Error("all fields is mondatory")
    }
    res.status(201).json(create)
}
const getFindByID = async (req, res) => {
    try {
        const dataID = await restAPI.findById(req.params.id);
        if (!dataID) {
            res.status(404).json({ error: req.params.id + " ID not found" });
        } else {
            res.status(200).json(dataID);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const putAPI = async (req, res) => {
    const dataID = await restAPI.findById(req.params.id);
    if (!dataID) {
        res.status(404)
        throw new Error("Error ID")
    }
    const updateData = await restAPI.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateData)
}
const deleteAPI = async (req, res) => {
    try {
        const dataID = await restAPI.findById(req.params.id);
        if (!dataID) {
            res.status(404).json({ error: "Data not found" });
            return;
        }
        await restAPI.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Data Deleted successfull"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getAPI, putAPI, deleteAPI, createAPI, getFindByID }