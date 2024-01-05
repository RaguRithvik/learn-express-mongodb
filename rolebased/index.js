// index.js
const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const logger = require("morgan");
const path = require("path")
const errorHandle = require("./middleware/errorHandler");
const connectDB = require("./config/index");
// USE
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(logger("combined"))
// Router
app.use("/api", require("./router/router"));
// Connect to the database
connectDB(); 
app.use(errorHandle);
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});
