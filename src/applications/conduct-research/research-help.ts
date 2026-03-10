import { Request, Response, NextFunction } from "express";

import { ValidationError } from "../../domain/errors";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";
import { createResearchHelpDTO } from "../../domain/dtos/research-help";
import ResearchHelp from "../../infrastructure/schema/research-help";

export const createResearchHelp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchHelpDTO.safeParse(req.body)
        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }
        await ResearchHelp.create(parsed.data)
        return res.json({
            status: 201,
            message: "Research Help Submitted"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllResearchHelp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchHelp.find().sort({ createdAt: -1 }).populate('categoryId', 'name')
        const researchHelp = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Research Helps retreived successfully", data: researchHelp
        })
    } catch (error) {
        next(error)
    }
}