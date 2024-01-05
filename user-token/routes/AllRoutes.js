const express = require("express");
const router = express.Router();
const { getAPI, putAPI, deleteAPI, createAPI, getFindByID } = require("../controller/Controller");
const validateJWTtoken = require("../middleware/validateJWTtoken");

router.use(validateJWTtoken)
router.route("/").get(getAPI).post(createAPI)
router.route("/:id").put(putAPI).delete(deleteAPI).get(getFindByID)
module.exports = router