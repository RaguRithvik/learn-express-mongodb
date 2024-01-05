const express = require("express");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");

const app = express();
const port = 3000;

const upload = multer({ dest: "./public/images" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("combined"));

const fakeAuth = (req, res, next) => {
    const auth = false;
    if (auth) {
        console.log("user auth status", auth);
        next();
    } else {
        res.status(401).json({
            title: "Unauthorized",
            message: "User is not authorized"
        });
    }
};

const getUser = (req, res) => {
    res.json({ message: "get all users" });
};

const createUser = (req, res) => {
    console.log(req.body);
    res.json({ message: "create user" });
};

app.post("/api/uploads", upload.single("image"), (req, res, next) => {
    console.log(req.body, req.file);
    res.json({ message: "File uploaded successfully" });
}, (err, req, res, next) => {
    res.status(400).send({ err: err.message });
});

// Apply middleware directly on the route
app.get("/api/users", fakeAuth, getUser);
app.post("/api/users", fakeAuth, createUser);

app.use((req, res) => {
    res.status(404).json({
        title: "Not Found",
        message: "Router not found"
    });
});

app.listen(port, () => {
    console.log("server start " + port);
});
