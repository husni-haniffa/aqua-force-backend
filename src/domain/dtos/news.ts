import { z } from 'zod'

export const createNewsDTO = z.object({
    title: z
    .string()
    .min(10, 'Title must be atleast 25 characters')
    .max(10, 'Title must not be more than 50 characters'),

    content: z
    .string()
    .min(10, 'Content must be atleast 75 characters')
    .max(15, 'Content must not be more than 725 characters')
})