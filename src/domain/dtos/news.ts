import { z } from "zod";

export const createNewsDTO = z.object({
    title: z
        .string()
        .trim()
        .min(25, "Title must be at least 25 characters")
        .max(50, "Title must not exceed 50 characters"),

    content: z
        .string()
        .trim()
        .min(75, "Content must be at least 75 characters")
        .max(725, "Content must not exceed 725 characters"),
});
