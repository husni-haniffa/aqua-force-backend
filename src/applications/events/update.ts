import { Request, Response, NextFunction } from "express";
import { createEventDTO } from "../../domain/dtos/event";
import { DuplicateError, NotFoundError, ValidationError } from "../../domain/errors";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import Event from "../../infrastructure/schema/events";

export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createEventDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const id = req.params.id

        const event = await Event.findById(id);
        if (!event) {
            throw new NotFoundError("Event not found");
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            parsed.data,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "Event updated successfully",
        });
    } catch (error) {
        next(error);
    }
};