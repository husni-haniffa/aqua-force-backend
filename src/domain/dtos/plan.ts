import z from "zod";

export const createPlanDTO = z.object({
    name: z
        .string({ error: "Plan name is required" })
        .trim()
        .min(2, "Plan name must be at least 2 characters")
        .max(100, "Plan name is too long"),

    slug: z
        .string({ error: "Slug is required" })
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(100, "Slug is too long")
        .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),

    price: z.coerce
        .number({ error: "Price is required" })
        .min(0, "Price cannot be negative"),

    currency: z
        .string()
        .trim()
        .default("LKR"),

    billing_period: z.enum(["Per Year", "5 Year", "Life Time"], {
        error: "Billing period is required",
    }),

    trial_days: z.coerce
        .number({ error: "Trial days must be a number" })
        .min(0, "Trial days cannot be negative")
        .default(14),

    features: z.array(z.string().trim().min(1, "Feature cannot be empty")).default([]),
});