import { Request, Response, NextFunction } from "express";
import Event from "../../infrastructure/schema/events";
import { NotFoundError } from "../../domain/errors";

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