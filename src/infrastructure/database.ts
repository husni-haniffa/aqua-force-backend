import mongoose from "mongoose";
import dotenv from "dotenv";
import { AppError } from "../domain/errors";

dotenv.config();

export const connectDatabase = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new AppError("MONGO_URI is not defined",500);
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected")

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
