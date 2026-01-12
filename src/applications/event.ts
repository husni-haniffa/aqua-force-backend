import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import DuplicateError from "../domain/errors/duplicate-error";
import NotFoundError from "../domain/errors/not-found-error";
import { checkIfExists } from "../infrastructure/utils/checkIfExists";
import { createEventDTO } from "../domain/dtos/event";
import Event from "../infrastructure/schema/events";

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

        const { title, description, eventDate, location } = parsed.data;

        const exists = await checkIfExists(Event, { title });
        if (exists) {
            throw new DuplicateError("Event already exists");
        }

        const event = await Event.create({ title, description, eventDate, location });

        res.status(201).json({
            statusCode: 201,
            message: "Event created successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const events = await Event.find()
        res.status(200).json({
            statusCode: 200,
            message: "Events retreived successfully", data: events
        })
    } catch (error) {
        next(error)
    }
}

export const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            throw new NotFoundError('Event not found')
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Event found successfully", data: event
        })
    } catch (error) {
        next(error)
    }
}

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

        const { title, description, eventDate, location } = parsed.data;

        const event = await Event.findById(req.params.id);
        if (!event) {
            throw new NotFoundError("Event not found");
        }

        if (title && title !== event.title) {
            const exists = await checkIfExists(Event, { title });
            if (exists) {
                throw new DuplicateError("Event already exists");
            }
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, eventDate, location },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "Event updated successfully",
            data: updateEvent,
        });

    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        if (!event) {
            throw new NotFoundError('Event not found')
        }
        res.status(200).json({
            statusCode: 200,
            message: "Event deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}
