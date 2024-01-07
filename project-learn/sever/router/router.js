const express = require("express");
const router = express.Router()
const { createUsers, loginUser } = require("../controller/usersController")
const { CreateManager, getManager, updateManager, deleteManager } = require("../controller/managerController")
const { getEmployee, createEmployee } = require("../controller/employeeController")
const Protected = require("../middleware/protected")

const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    },
})
var storageDocuments = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/documents");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});
const upload = multer({ storage: storage }).single("images");
const uploadDocuments = multer({ storage: storageDocuments }).single("documents");
//Router
router.route("/create").post(createUsers)
router.route("/login").post(loginUser)
router.route("/manager").post(Protected, upload, CreateManager).get(Protected, getManager).delete(Protected, deleteManager).put(Protected, upload, updateManager)
router.route("/employee").post(Protected, upload, uploadDocuments, createEmployee).get(Protected, getEmployee)

module.exports = router