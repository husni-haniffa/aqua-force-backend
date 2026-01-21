import { Request, Response, NextFunction } from "express";
import Category from "../../infrastructure/schema/category";
import { NotFoundError } from "../../domain/errors";

export const getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            throw new NotFoundError('Category not found')
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Category found successfully", data: category
        })
    } catch (error) {
        next(error)
    }
}