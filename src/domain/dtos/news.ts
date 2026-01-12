import { z } from 'zod'

export const createNewsDTO = z.object({
    title: z
    .string()
    .min(25, 'Title must be atleast 25 characters')
    .max(50, 'Title must not be more than 50 characters'),

    content: z
    .string()
    .min(75, 'Content must be atleast 75 characters')
    .max(725, 'Content must not be more than 725 characters')
})