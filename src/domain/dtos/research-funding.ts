import { z } from "zod";

const phoneRegex = /^\d{10}$/;

export const createResearchFundingDTO = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Please select a title")
        .max(10, "Title is too long"),

    name: z
        .string()
        .trim()
        .min(1, "Full name is required")
        .max(100, "Name is too long"),

    mobile: z
        .string()
        .regex(phoneRegex, "Enter a valid mobile number"),

    whatsapp: z
        .string()
        .regex(phoneRegex, "Enter a valid WhatsApp number"),


    email: z
        .string()
        .trim()
        .email("Enter a valid email address")
        .max(255, "Email is too long"),

    linkedin: z
        .string()
        .trim()
        .url("Enter a valid LinkedIn URL")
        .or(z.literal("")),

    orcid: z
        .string()
        .trim()
        .url("Enter a valid ORCID URL")
        .or(z.literal("")),

    researchgate: z
        .string()
        .trim()
        .url("Enter a valid ResearchGate URL")
        .or(z.literal("")),

    scholar: z
        .string()
        .trim()
        .url("Enter a valid Google Scholar URL")
        .or(z.literal("")),

    designation: z
        .string()
        .trim()
        .min(1, "Designation is required")
        .max(100, "Designation is too long"),

    affiliation: z
        .string()
        .trim()
        .min(1, "Affiliation is required")
        .max(250, "Affiliation is too long"),

    degree: z
        .string()
        .trim()
        .min(1, "Please select a degree"),

    categoryId: z
        .string()
        .min(1, "Please select a category"),

    minorResearchArea: z
        .string()
        .trim()
        .min(1, "Please enter a short summary")
        .max(1000, "Summary is too long"),

    fundingAmount: z
        .string()
        .trim()
        .min(3, "Funding amount more than Rs 90")
        .max(9, "Funding amount cannot exceed Rs 999,999,999"),

    howCanYouContribute: z
        .string()
        .trim()
        .min(1, "Please explain your contribution")
        .max(1000, "Contribution is too long"),
});