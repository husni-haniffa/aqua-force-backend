import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
