import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category"
        },
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        abstract: {
            type: String,
            required: true,
            trim: true
        },
        keywords: {
            type: [String],
            required: true,
            trim: true
        },
        filePath: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['PENDING', 'UNDER_REVIEW', 'REJECTED', 'ACCEPTED'],
            default: 'PENDING'
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        accessLevel: {
            type: String,
            enum: ['PUBLIC', 'MEMBERS'],
            default: 'PUBLIC'
        }
    },
    {
        timestamps: true
    }
)

const Submission = mongoose.model("Submission", submissionSchema)

export default Submission