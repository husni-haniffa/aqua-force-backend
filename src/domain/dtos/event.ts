import { z } from "zod";

export const createEventDTO = z.object({
    title: z
        .string()
        .trim()
        .min(25, "Title must be at least 25 characters")
        .max(75, "Title must not exceed 50 characters")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(50, "Description must be at least 50 characters")
        .max(100, "Description must not exceed 100 characters"),

    eventDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        })
        .transform((val) => new Date(val))
        .refine((date) => date > new Date(), {
            message: "Date must be in the future",
        }),

    eventTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),

    location: z
        .string()
        .trim()
        .min(3, "Location must be at least 3 characters")
        .max(30, "Location must not exceed 30 characters")
        .regex(
            /^[A-Za-z0-9 ,.-]+$/,
            "Location contains invalid characters"
        ),
});
