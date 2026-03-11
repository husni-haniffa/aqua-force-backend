import mongoose from "mongoose";

const researchSupervisorSchema = new mongoose.Schema(
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
            maxlength: 200
        },

        mobile: {
            type: String,
            required: true,
            match: /^07\d{8}$/
        },

        whatsapp: {
            type: String,
            required: true,
            match: /^07\d{8}$/
        },

        email: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255
        },

        linkedin: {
            required: true,
            type: String,
            trim: true
        },

        orcid: {
            required: true,
            type: String,
            trim: true
        },

        researchgate: {
            type: String,
            trim: true
        },

        scholar: {
            required: true,
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

        minorResearchIdea: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },

        noOfStudents: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },

        howCanYouContribute: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        }
    },
    {
        timestamps: true
    }
);

const ResearchSupervisor = mongoose.model("ResearchSupervisor", researchSupervisorSchema);

export default ResearchSupervisor;