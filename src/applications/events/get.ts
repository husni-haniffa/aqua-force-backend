import { Request, Response, NextFunction } from "express";
import Event from "../../infrastructure/schema/events";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";

export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await Event.find()
        const events = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Events retreived successfully", data: events
        })
    } catch (error) {
        next(error)
    }
}