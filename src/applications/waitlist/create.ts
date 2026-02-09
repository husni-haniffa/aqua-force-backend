import { Request, Response, NextFunction } from "express";

import { ValidationError, DuplicateError } from "../../domain/errors";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import { createWaitlistDTO } from "../../domain/dtos/waitlist";
import Waitlist from "../../infrastructure/schema/waitlist";

export const createWaitlist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createWaitlistDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { email } = parsed.data;

        const exists = await checkIfExists(Waitlist, { email });
        if (exists) {
            throw new DuplicateError("Already applied");
        }

        const category = await Waitlist.create(parsed.data);

        res.status(201).json({
            statusCode: 201,
            message: "Application Received"
        });
    } catch (error) {
        next(error);
    }
};