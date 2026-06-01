import { Request, Response, NextFunction } from "express";
import Event from "../../infrastructure/schema/events";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";

export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // start of today

        const response = await Event.find({
            eventDate: { $gte: today }
        }).sort({ eventDate: 1 });

        const events = formatTimestamps(response);

        res.status(200).json({
            statusCode: 200,
            message: "Events retrieved successfully",
            data: events,
        });
    } catch (error) {
        next(error);
    }
};