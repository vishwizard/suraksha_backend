const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");

    } catch (error) {
        console.log("MongoDB Connection Error : ", error);
        process.exit(1);
    }
}

module.exports = connectDB;