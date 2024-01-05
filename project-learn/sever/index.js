// index.js
const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const errorHandle = require("./middleware/errorHandler");
const connectDB = require("./config/index");
// USE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(logger("combined"))
// Router
app.use("/api", require("./router/router"));
// Connect to the database
connectDB();
//Middleware
app.use(errorHandle);
// Custom 404 middleware for REST API
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found', message: 'Not Found' });
});
app.listen(process.env.PORT || 5001, () => {
    console.log("Server started " + process.env.PORT);
});
