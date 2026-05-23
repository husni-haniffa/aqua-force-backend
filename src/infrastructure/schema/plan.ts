import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "LKR",
            trim: true,
        },

        billing_period: {
            required: true,
            type: String,
            trim: true,
        },

        trial_days: {
            type: Number,
            default: 14,
        },

        features: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;