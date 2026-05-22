import { z } from "zod";

export const createEventDTO = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Event title is required")
        .max(500, "Event title is too long")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(1, "Event description is required")
        .max(1000, "Event description is too long"),

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
        .min(1, "Event location is required")
        .max(500, "Event location is too long")
        .regex(
            /^[A-Za-z0-9 ,.-]+$/,
            "Location contains invalid characters"
        ),
});
