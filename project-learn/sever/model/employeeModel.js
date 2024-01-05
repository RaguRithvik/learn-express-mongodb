const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add the Email Address"],
        unique: [true, "Email ID already taken"],
    },
    name: {
        type: String,
        required: [true, "Please add the Name"]
    },
    skills: {
        type: Array,
        required: [true, "Please add the Skills"]
    },
    image: {
        type: String,
        required: [true, "Please add the Role"]
    },
    documents: {
        type: String,
        required: [true, "Please add the Role"]
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("employee", employeeSchema)