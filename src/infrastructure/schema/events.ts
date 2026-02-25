import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        eventDate: {
            type: Date,
            required: true,
        },
        eventTime: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        imagePath: {
            required: true,
            type: String,
        },
        imageUrl: {
            required: true,
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Event = mongoose.model("Event", eventSchema)

export default Event