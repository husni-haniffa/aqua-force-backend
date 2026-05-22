import mongoose from "mongoose";

const researchIdeaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255
        },

        mobile: {
            type: String,
            required: true,
            match: /^\d{10}$/
        },

        whatsapp: {
            type: String,
            required: true,
            match: /^\d{10}$/
        },

        email: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255
        },

        linkedin: {
            type: String,
            trim: true
        },

        orcid: {
            type: String,
            trim: true
        },

        researchgate: {
            type: String,
            trim: true
        },

        scholar: {
            type: String,
            trim: true
        },

        designation: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        affiliation: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category"
        },

        minorResearchArea: {
            type: String,
            required: true,
            trim: true,
        },

        researchIdea: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        howCanYouContribute: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
);

const ResearchIdea = mongoose.model("ResearchIdea", researchIdeaSchema);

export default ResearchIdea;