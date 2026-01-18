import { z } from 'zod';

export const createSubmissionDTO = z.object({
    userId: z.string(),

    categoryId: z.string(),

    title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 25 characters')
    .max(10, 'Title must not exceed 50 characters')
    .regex(
        /^[A-Za-z0-9\s:,\-()./]+$/,
        'Title contains invalid characters'
    ),

    abstract: z
    .string()
    .trim()
    .min(5, 'Abstract must be at least 500 characters')
    .max(10, 'Abstract must not exceed 1000 characters'),

    keywords: z
    .array(z.string().trim().min(1, 'Keyword cannot be empty'))
    .min(1, 'At least 1 keyword is required')
    .max(5, 'No more than 5 keywords are allowed'),
});

