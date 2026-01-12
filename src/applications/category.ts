import { Request, Response, NextFunction } from "express";
import { createCategoryDTO, updateCategoryDTO } from "../domain/dtos/category";
import ValidationError from "../domain/errors/validation-error";
import Category from "../infrastructure/schema/category";
import DuplicateError from "../domain/errors/duplicate-error";
import NotFoundError from "../domain/errors/not-found-error";

export const createCategory = async (
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

        const exists = await checkIfCategoryExists(name);
        if (exists) {
            throw new DuplicateError("Category already exists");
        }

        const category = await Category.create({ name });

        res.status(201).json({ 
            statusCode: 201, 
            message: "Category created successfully"
        });
    } catch (error) {
        next(error);
    }
};

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

export const getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await Category.findById(req.params.id)
        if(!category) {
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

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = updateCategoryDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { name } = parsed.data;

        const category = await Category.findById(req.params.id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        if (name && name !== category.name) {
            const exists = await checkIfCategoryExists(name);
            if (exists) {
                throw new DuplicateError("Category already exists");
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "Category updated successfully",
            data: updatedCategory,
        });

    } catch (error) {
        next(error);
    }
};

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

const checkIfCategoryExists = async (name: string): Promise<boolean> => {
    const existingCategory = await Category.findOne({ name });
    return !!existingCategory;
};