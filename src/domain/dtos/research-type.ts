import { z } from "zod";

export const createResearchTypeDTO = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Research type is required")
        .max(21, "Name must not exceed 21 characters")
        .regex(/^[A-Za-z0-9\s:,\-()./]+$/, "Name contains invalid characters"),
});
