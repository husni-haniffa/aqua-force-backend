import { z } from "zod";

export const createNewsDTO = z.object({
    title: z
        .string()
        .trim()
        .min(1, "News title is required")
        .max(2500, "News title is too long"),

    content: z
        .string()
        .trim()
        .min(1, "News content is required")
        .max(10000, "News content is too long"),
});
