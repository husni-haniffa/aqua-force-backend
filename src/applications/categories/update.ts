import { Request, Response, NextFunction } from "express";
import { createCategoryDTO } from "../../domain/dtos/category";
import { DuplicateError, NotFoundError, ValidationError } from "../../domain/errors";
import Category from "../../infrastructure/schema/category";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createCategoryDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { name } = parsed.data;

        const exists = await checkIfExists(Category, { name });
        if (exists) {
            throw new DuplicateError("Category already exists");
        }

        const id = req.params.id

        const category = await Category.findById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            parsed.data,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "Category updated successfully",
        });
    } catch (error) {
        next(error);
    }
};