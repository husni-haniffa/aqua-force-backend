import { Request, Response, NextFunction } from "express";
import Waitlist from "../../infrastructure/schema/waitlist";

export const getAllWaitlist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await Waitlist.find().sort({ createdAt: -1 })
       
        res.status(200).json({
            statusCode: 200,
            message: "Waitlist retreived successfully", data: response
        })
    } catch (error) {
        next(error)
    }
}