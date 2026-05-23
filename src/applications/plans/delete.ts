import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../domain/errors"
import Plan from "../../infrastructure/schema/plan";

export const deletePlan = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id)
        if (!plan) {
            throw new NotFoundError('Plan not found')
        }
        res.status(200).json({
            statusCode: 200,
            message: "Plan deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}