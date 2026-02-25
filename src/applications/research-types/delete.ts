import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../domain/errors"
import Category from "../../infrastructure/schema/category"
import ResearchType from "../../infrastructure/schema/researchType";

export const deleteResearchType = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const researchType = await ResearchType.findByIdAndDelete(req.params.id)
        if (!researchType) {
            throw new NotFoundError('Research Type not found')
        }
        res.status(200).json({ 
            statusCode: 200, 
            message: "Research Type deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}