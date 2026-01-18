import { z } from 'zod'

export const createEventDTO = z.object({
    title: z
        .string()
        .trim()
        .min(5, 'Title must be at least 5 characters')
        .max(25, 'Title must not exceed 25 characters'),

    description: z
        .string()
        .trim()
        .min(25, 'Description must be at least 25 characters')
        .max(100, 'Description must not exceed 100 characters'),

    eventDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })
        .transform((val) => new Date(val))
        .refine((date) => date > new Date(), {
            message: 'Event date must be in the future',
        }),

    eventTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format'),

    location: z
        .string()
        .trim()
        .min(3, 'Location must be at least 3 characters')
        .max(50, 'Location must not exceed 50 characters')
        .regex(/^[a-zA-Z0-9 ,.-]+$/, 'Location contains invalid characters'),
})