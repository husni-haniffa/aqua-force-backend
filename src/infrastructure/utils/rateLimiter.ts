import rateLimit from "express-rate-limit";
import { AppError } from "../../domain/errors";

export const researchApplicationFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,

    handler: (req, res, next) => {
        next(new AppError("Too many requests. please try again in 15 minutes", 429));
    },
});