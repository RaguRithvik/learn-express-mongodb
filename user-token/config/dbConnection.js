const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.API_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        //mongodb+srv://ragu:7twU6eO6NIhitH1t@crud.brlsahd.mongodb.net/learn-rest-api?retryWrites=true&w=majority
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = connectDB;
