import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.db_connect)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("connection error:" , error);
        
    }
}