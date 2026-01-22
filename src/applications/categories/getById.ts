import { Request, Response, NextFunction } from "express";
import Category from "../../infrastructure/schema/category";
import { NotFoundError } from "../../domain/errors";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";

export const getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await Category.findById(req.params.id)
        if (!response) {
            throw new NotFoundError('Category not found')
        }
        const category = formatTimestamps(response)
        return res.status(200).json({
            statusCode: 200,
            message: "Category found successfully", data: category
        })
    } catch (error) {
        next(error)
    }
}

