const express = require("express");
const router = express.Router()
const { createUsers, loginUser } = require("../controller/usersController")
const { CreateManager, getManager, updateManager, deleteManager } = require("../controller/managerController")
const Protected = require("../middleware/protected")

const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    },
})
const upload = multer({ storage: storage }).single("images")
//Router
router.route("/create").post(createUsers)
router.route("/login").post(loginUser)
router.route("/manager").post(Protected, upload, CreateManager).get(Protected, getManager).delete(Protected, deleteManager).put(Protected, upload, updateManager)
module.exports = router