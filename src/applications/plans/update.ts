import { Request, Response, NextFunction } from "express";
import Plan from "../../infrastructure/schema/plan";
import { createPlanDTO } from "../../domain/dtos/plan";
import { NotFoundError, ValidationError } from "../../domain/errors";


export const updatePlan = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createPlanDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const id = req.params.id

        const plan = await Plan.findById(id);
        if (!plan) {
            throw new NotFoundError("Plan not found");
        }

        await Plan.findByIdAndUpdate(
            id,
            parsed.data,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "Plan updated successfully",
        });
    } catch (error) {
        next(error);
    }
};