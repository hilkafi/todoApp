const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
}

module.exports = connectDatabase;