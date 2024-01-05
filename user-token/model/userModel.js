const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the Name"]
    },
    email: {
        type: String,
        required: [true, "Please add the Profession"],
        unique: [true, "Email ID already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the Profession"]
    }
},
{
    timestamps: true
})
module.exports = mongoose.model("Users", userSchema)