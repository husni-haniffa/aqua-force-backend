import { Request, Response, NextFunction } from "express";
import Category from "../../infrastructure/schema/category";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";

export const getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await Category.find().sort({ createdAt: -1 })
        const categories = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Categories retreived successfully", data: categories
        })
    } catch (error) {
        next(error)
    }
}