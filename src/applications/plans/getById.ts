import { Request, Response, NextFunction } from "express";
import Plan from "../../infrastructure/schema/plan";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";
import { NotFoundError } from "../../domain/errors";

export const getPlanById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await Plan.findById(req.params.id)
        if (!response) {
            throw new NotFoundError('Plan not found')
        }
        const plan = formatTimestamps(response)
        return res.status(200).json({
            statusCode: 200,
            message: "Plan found successfully", data: plan
        })
    } catch (error) {
        next(error)
    }
}

