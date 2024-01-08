const express = require("express");
const router = express.Router()
const { getEmployee, createEmployee } = require("../controller/employeeController")
const Protected = require("../middleware/protected")
const multer = require('multer');

var storageDocuments = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "images") {
            cb(null, './public/images')
        }
        else if (file.fieldname === "documents") {
            cb(null, './public/documents');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    },
});

const uploadDocuments = multer({
    storage: storageDocuments,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
}).fields(
    [
        {
            name: 'images',
            maxCount: 3 
        },
        {
            name: 'documents',
            maxCount: 3
        }
    ]
);

router.route("/employee").post(Protected, uploadDocuments, createEmployee).get(Protected, getEmployee)

module.exports = router;
