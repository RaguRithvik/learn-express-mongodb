const express = require("express")
const router = express.Router();
const validateJWTtoken = require("../middleware/validateJWTtoken");
const { RegisterUser, LoginUser, currentUser } = require("../controller/UserController")

//Router
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.get("/current", validateJWTtoken, currentUser);

module.exports = router