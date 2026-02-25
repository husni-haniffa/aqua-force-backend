import { Request, Response, NextFunction } from "express";
import Category from "../../infrastructure/schema/category";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";
import ResearchType from "../../infrastructure/schema/researchType";

export const getAllResearchTypes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchType.find().sort({ createdAt: -1 })
        const researchTypes = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Research Types retreived successfully", data: researchTypes
        })
    } catch (error) {
        next(error)
    }
}