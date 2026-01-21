import { Request, Response, NextFunction } from "express";
import Event from "../../infrastructure/schema/events";

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