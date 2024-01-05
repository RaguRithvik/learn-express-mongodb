const express = require("express");
const path = require("path")
const logger = require("morgan")
const multer = require("multer")
const router = express.Router();
const upload = multer({ dest: "./public/images" })
const app = express();

const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(logger("combined"))

const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()} --- Request [${req.method}]`);
    next();
};

const fakeAuth = (req, res, next) => {
    const auth = false;
    if (auth) {
        console.log("user auth status", auth);
        next();
    } else {
        // throw new Error("user is not authorized");
        res.status(401).json({
            title: "Unauthorized",
            message: "User is not authorized"
        });
    }
};


app.use(loggerMiddleware);
app.use("/api/users", router);
router.use(fakeAuth);

const getUser = (req, res) => {
    res.json({ message: "get all users" });
};

const createUser = (req, res) => {
    console.log(req.body);
    res.json({ message: "create user" });
};

router.route("/").get(getUser).post(createUser);

const errorHandle = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch (statusCode) {
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message
            });
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message
            });
            break;
        case 500:
            res.json({
                title: "Server Error",
                message: err.message
            });
            break;
        default:
            break;
    }
};

app.post("/uploads", upload.single("image"), (req, res, next) => {
    console.log(req.body, req.file);
    res.json({ message: "File uploaded successfully" });
}, (err, req, res, next) => {
    res.status(400).send({ err: err.message });
});

app.all("*", (req, res) => {
    res.status(404).json({
        title: "Not Found",
        message: "Router not found"
    });
});

app.use(errorHandle);

app.listen(port, () => {
    console.log("server start " + port);
});
