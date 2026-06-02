import { z } from "zod";

export const createResearchTypeDTO = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Research type is required")
        .max(30, "Research type must not exceed 30 characters")
        .regex(/^[A-Za-z0-9\s:,\-()./]+$/, "Research type contains invalid characters"),
});
