import { Request, Response, NextFunction } from "express";
import Event from "../../infrastructure/schema/events";
import { NotFoundError } from "../../domain/errors";

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