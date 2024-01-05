const express = require("express");
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: './public/images' });
const { createUsers, loginUser } = require("../controller/usersController")
const { CreateManager } = require("../controller/managerController")
const Protected = require("../middleware/protected")
router.route("/create").post(createUsers)
router.route("/login").post(loginUser)
router.post("/manager", Protected, upload.single('images'), CreateManager)
router.post("/employee", Protected, upload.single('images'), CreateManager)

module.exports = router