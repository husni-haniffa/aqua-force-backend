import { z } from "zod";

export const createSubmissionDTO = z.object({
    categoryId: z.string().min(1, "Category is required"),

    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters")
        .max(50, "Title must not exceed 50 characters")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    abstract: z
        .string()
        .trim()
        .min(500, "Abstract must be at least 500 characters")
        .max(1000, "Abstract must not exceed 1000 characters"),

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
