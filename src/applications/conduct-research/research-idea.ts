import { Request, Response, NextFunction } from "express";
import { createResearchIdeaDTO } from "../../domain/dtos/reseach-idea";
import { ValidationError } from "../../domain/errors";
import ResearchIdea from "../../infrastructure/schema/research-idea";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";

export const createResearchIdea = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchIdeaDTO.safeParse(req.body)
        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }
        await ResearchIdea.create(parsed.data)
        return res.json({
            status: 201,
            message: "Research Idea Submitted"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllResearchIdea = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchIdea.find().sort({ createdAt: -1 }).populate('categoryId', 'name')
        const researchIdeas = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Research Ideas retreived successfully", data: researchIdeas
        })
    } catch (error) {
        next(error)
    }
}