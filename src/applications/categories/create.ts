import { Request, Response, NextFunction } from "express";
import { createCategoryDTO } from "../../domain/dtos/category";
import { ValidationError, DuplicateError } from "../../domain/errors";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import Category from "../../infrastructure/schema/category";

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

        const exists = await checkIfExists(Category, {name});
        if (exists) {
            throw new DuplicateError("Category already exists");
        }

        const category = await Category.create(parsed.data);

        res.status(201).json({ 
            statusCode: 201, 
            message: "Category created successfully"
        });
    } catch (error) {
        next(error);
    }
};