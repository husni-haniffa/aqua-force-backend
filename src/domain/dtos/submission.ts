import { z } from "zod";

export const createSubmissionDTO = z.object({
    userId: z.string().min(1, "User Id is required"),

    userName: z.string().min(1, "User Name is required"),

    categoryId: z.string().min(1, "Category is required"),

    researchTypeId: z.string().min(1, "Research Type is required"),

    title: z
        .string()
        .trim()
        .min(50, "Title must be at least 50 characters")
        .max(200, "Title must not exceed 200 characters")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    abstract: z
        .string()
        .trim()
        .min(1000, "Abstract must be at least 1,000 characters")
        .max(10000, "Abstract must not exceed 10,000 characters"),

    keywords: z
        .array(
            z
            .string()
            .trim()
            .min(1, "Keyword cannot be empty")
            .regex(/^[A-Za-z0-9\- ]+$/, "Invalid keyword")
        )
        .min(1, "At least one keyword is required")
        .max(5, "No more than 5 keywords allowed"),
});
