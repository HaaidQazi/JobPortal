import mongoose from "mongoose";

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    try {
        // No deprecated options needed in Mongoose 6+
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Database Connected');
    } catch (error) {
        // Handle any connection errors
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;