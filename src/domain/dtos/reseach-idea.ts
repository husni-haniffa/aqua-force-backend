import { z } from "zod";

const phoneRegex = /^07\d{8}$/;

export const createResearchIdeaDTO = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(20, "Title too long"),

    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(200, "Name cannot exceed more than 200 characters"),

    mobile: z
        .string()
        .regex(phoneRegex, "Mobile must be 10 digits starting with 07"),

    whatsapp: z
        .string()
        .regex(phoneRegex, "WhatsApp must be 10 digits starting with 07"),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .max(255, "Email too long"),

    linkedin: z
        .string()
        .trim()
        .url("Invalid LinkedIn URL"),

    orcid: z
        .string()
        .trim()
        .url("Invalid ORCID URL"),

    researchgate: z
        .string()
        .trim()
        .url("Invalid ResearchGate URL"),

    scholar: z
        .string()
        .trim()
        .url("Invalid Google Scholar URL"),

    designation: z
        .string()
        .trim()
        .min(2, "Designation required")
        .max(150, "Designation too long"),

    affiliation: z
        .string()
        .trim()
        .min(2, "Affiliation required")
        .max(200, "Affiliation too long"),

    categoryId: z
        .string()
        .min(1, "Category is required"),

    minorResearchIdea: z
        .string()
        .trim()
        .min(10, "Minor research idea must be at least 10 characters")
        .max(1000, "Too long"),

    researchIdea: z
        .string()
        .trim()
        .min(20, "Research idea must be at least 20 characters")
        .max(2000, "Too long"),

    howCanYouContribute: z
        .string()
        .trim()
        .min(10, "Please explain your contribution")
        .max(1000, "Too long"),
});
