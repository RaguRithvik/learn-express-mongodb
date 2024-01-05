const mongoose = require("mongoose")

const restAPISchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the Name"]
    },
    profession: {
        type: String,
        required: [true, "Please add the Profession"]
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},
{
    timestamps: true
})
module.exports = mongoose.model("restAPI", restAPISchema)