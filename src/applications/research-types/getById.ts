import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../domain/errors";
import ResearchType from "../../infrastructure/schema/researchType";

export const getResearchTypeById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchType.findById(req.params.id)
        if (!response) {
            throw new NotFoundError('Research Type not found')
        }
        const researchType = response
        return res.status(200).json({
            statusCode: 200,
            message: "Research Type found successfully", data: researchType
        })
    } catch (error) {
        next(error)
    }
}

