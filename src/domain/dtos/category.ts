import { z } from 'zod'

export const createCategoryDTO = z.object({
    name: z
    .string()
    .min(5, 'Category name must be atleast 5 characters')
    .max(25, 'Category name must not be more than 25 characters')
    .regex(/^[a-zA-Z ]+$/, 'Category name must contain be only alphabets')
})

