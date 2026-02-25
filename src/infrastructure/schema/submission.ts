import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category"
        },
        researchTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "ResearchType"
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
        },
        socialMediaLinks: {
            youtube: { type: String, default: null, trim: true },
            facebook: { type: String, default: null, trim: true },
            instagram: { type: String, default: null, trim: true },
            linkedin: { type: String, default: null, trim: true },
        },
    },
    {
        timestamps: true
    }
)

const Submission = mongoose.model("Submission", submissionSchema)

export default Submission