import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../../domain/errors";
import { createResearchTypeDTO } from "../../domain/dtos/research-type";
import ResearchType from "../../infrastructure/schema/researchType";

export const updateResearchType = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchTypeDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const id = req.params.id

        const researchType = await ResearchType.findById(id);
        if (!researchType) {
            throw new NotFoundError("Research Type not found");
        }

        await ResearchType.findByIdAndUpdate(
            id,
            parsed.data,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "Research Type updated successfully",
        });
    } catch (error) {
        next(error);
    }
};