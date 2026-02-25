import mongoose from "mongoose";

const researchTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
    },
    {
        timestamps: true
    }
)

const ResearchType = mongoose.model("ResearchType", researchTypeSchema)

export default ResearchType