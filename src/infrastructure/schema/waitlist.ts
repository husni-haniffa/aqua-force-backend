import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true
    }
)

const Waitlist = mongoose.model("Waitlist", waitlistSchema)

export default Waitlist