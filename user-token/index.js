//declaration 
const express = require("express")
const app = express();
const env = require('dotenv').config();
const errorHandle = require("./middleware/errorHandler")
const dbConnection = require("./config/dbConnection");
//USE
app.use(express.json())
app.use("/api", require("./routes/AllRoutes"));
app.use("/api/user", require("./routes/UserRouter"));
dbConnection()
app.use(errorHandle);
app.all("*", (req, res) => {
    res.status(404).json({
        title: "Not Found",
        message: "Router not found"
    });
});
app.listen("3000", () => {
    console.log("server start");
})