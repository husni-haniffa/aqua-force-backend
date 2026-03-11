import { Request, Response, NextFunction } from "express";
import { createResearchPlacementDTO } from "../../domain/dtos/research-placement";
import { ValidationError } from "../../domain/errors";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";
import ResearchPlacement from "../../infrastructure/schema/research-placement";

export const createResearchPlacement = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchPlacementDTO.safeParse(req.body)
        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }
        await ResearchPlacement.create(parsed.data)
        return res.json({
            status: 201,
            message: "Research Placement Submitted"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllResearchPlacement = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchPlacement.find().sort({ createdAt: -1 }).populate('categoryId', 'name')
        const researchPlacements = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Research Placement retreived successfully", data: researchPlacements
        })
    } catch (error) {
        next(error)
    }
}