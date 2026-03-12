import { Request, Response, NextFunction } from "express";
import { createResearchFundingDTO } from "../../domain/dtos/research-funding";
import { NotFoundError, ValidationError } from "../../domain/errors";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";
import ResearchFunding from "../../infrastructure/schema/research-funding";

export const createResearchFunding = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchFundingDTO.safeParse(req.body)
        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }
        await ResearchFunding.create(parsed.data)
        return res.json({
            status: 201,
            message: "Research Funding Submitted"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllResearchFunding = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchFunding.find().sort({ createdAt: -1 }).populate('categoryId', 'name')
        const researchFundings = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Research Ideas retreived successfully", data: researchFundings
        })
    } catch (error) {
        next(error)
    }
}

export const deleteResearchFunding = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const funding = await ResearchFunding.findByIdAndDelete(req.params.id)
        if (!funding) {
            throw new NotFoundError('Application not found')
        }
        res.status(200).json({ 
            statusCode: 200, 
            message: "Application deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}