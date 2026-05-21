import mongoose from "mongoose";

const researchFundingSchema = new mongoose.Schema(
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

        degree: {
            type: String,
            required: true,
            trim: true,
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

        fundingAmount: {
            type: String,
            required: true,
            trim: true,
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

const ResearchFunding = mongoose.model("ResearchFunding", researchFundingSchema);

export default ResearchFunding;