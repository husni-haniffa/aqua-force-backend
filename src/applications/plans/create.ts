import { Request, Response, NextFunction } from "express";
import { createPlanDTO } from "../../domain/dtos/plan";
import { DuplicateError, ValidationError } from "../../domain/errors";
import Plan from "../../infrastructure/schema/plan";

export const createPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createPlanDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { name, slug } = parsed.data;

        const exists = await Plan.findOne({
            $or: [{ name }, { slug }],
        });

        if (exists) {
            throw new DuplicateError("Plan already exists");
        }

        await Plan.create(parsed.data);

        res.status(201).json({
            statusCode: 201,
            message: "Plan created successfully"
        });
    } catch (error) {
        next(error);
    }
};