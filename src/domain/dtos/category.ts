import { z } from "zod";

export const createCategoryDTO = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Research category is required")
        .max(50, "Research category is too long")
});
