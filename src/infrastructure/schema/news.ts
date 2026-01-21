import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        imagePath: {
            type: String,
        },
        imageUrl: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const News = mongoose.model("News", newsSchema)

export default News