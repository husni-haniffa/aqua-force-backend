import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../domain/errors"
import Category from "../../infrastructure/schema/category"

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            throw new NotFoundError('Category not found')
        }
        res.status(200).json({ 
            statusCode: 200, 
            message: "Category deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}