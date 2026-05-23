
import { Request, Response, NextFunction } from "express";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";
import Plan from "../../infrastructure/schema/plan";

export const getAllPlans = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const response = await Plan.find();
        const plans = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            data: plans,
        });
    } catch (error) {
        next(error);
    }
};
