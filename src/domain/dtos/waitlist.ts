import z from "zod";

export const createWaitlistDTO = z.object({
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    phoneNumber: z
        .string()
        .trim()
        .regex(/^07\d{8}$/, "Phone number must start with 07 and be 10 digits")
});
