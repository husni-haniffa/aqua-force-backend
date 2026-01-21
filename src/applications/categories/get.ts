import { Request, Response, NextFunction } from "express";
import Category from "../../infrastructure/schema/category";

export const getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await Category.find()
        res.status(200).json({
            statusCode: 200,
            message: "Categories retreived successfully", data: categories
        })
    } catch (error) {
        next(error)
    }
}