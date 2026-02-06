// db is connected here
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`, {
    retryWrites: true,
    w: "majority"})
    console.log("connected to DB");
    } catch (error) {
        console.log("failed to connect to DB", error);
    }
}

export default connectDB;