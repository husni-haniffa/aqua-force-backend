import { z } from "zod";

export const createResearchTypeDTO = z.object({
    name: z
        .string()
        .trim()
        .min(5, "Name must be at least 5 characters")
        .max(25, "Name must not exceed 25 characters")
        .regex(/^[A-Za-z ]+$/, "Name must contain only alphabets"),
});
