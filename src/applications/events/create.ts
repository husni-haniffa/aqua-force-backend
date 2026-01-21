import { Request, Response, NextFunction } from "express";
import { createEventDTO } from "../../domain/dtos/event";
import { DuplicateError, ValidationError } from "../../domain/errors";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import Event from "../../infrastructure/schema/events";

export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createEventDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { title } = parsed.data;
        const exists = await checkIfExists(Event, { title });
        if (exists) {
            throw new DuplicateError("Event already exists");
        }

        const event = await Event.create(parsed.data);

        res.status(201).json({
            statusCode: 201,
            message: "Event created successfully"
        });
    } catch (error) {
        next(error);
    }
};