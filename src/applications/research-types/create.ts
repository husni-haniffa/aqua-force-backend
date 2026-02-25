import { Request, Response, NextFunction } from "express";
import { ValidationError, DuplicateError } from "../../domain/errors";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import { createResearchTypeDTO } from "../../domain/dtos/research-type";
import ResearchType from "../../infrastructure/schema/researchType";


export const createResearchType = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchTypeDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { name } = parsed.data;

        const exists = await checkIfExists(ResearchType, {name});
        if (exists) {
            throw new DuplicateError("Research already exists");
        }

         await ResearchType.create(parsed.data);

        res.status(201).json({ 
            statusCode: 201, 
            message: "Research Type created successfully"
        });
    } catch (error) {
        next(error);
    }
};