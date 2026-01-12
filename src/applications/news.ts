import { Request, Response, NextFunction } from "express";
import { createNewsDTO } from "../domain/dtos/news";
import ValidationError from "../domain/errors/validation-error";
import News from "../infrastructure/schema/news";
import { checkIfExists } from "../infrastructure/utils/checkIfExists";
import DuplicateError from "../domain/errors/duplicate-error";
import NotFoundError from "../domain/errors/not-found-error";

export const createNews = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createNewsDTO.safeParse(req.body)
        if(!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message)
        }
        const { title, content } = parsed.data

        const exists = await checkIfExists(News, {title});
        if (exists) {
            throw new DuplicateError("Title already exists");
        }

        const news = await News.create({title, content})
        res.status(201).json({
            statusCode: 201,
            message: "News created successfully"
        });
    } catch (error) {
        next(error)
    }
}

export const getAllNews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const news = await News.find()
        res.status(200).json({
            statusCode: 200,
            message: "News retreived successfully", data: news
        })
    } catch (error) {
        next(error)
    }
}

export const getNewsById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const news = await News.findById(req.params.id)
        if (!news) {
            throw new NotFoundError('News not found')
        }
        return res.status(200).json({
            statusCode: 200,
            message: "News found successfully", data: news
        })
    } catch (error) {
        next(error)
    }
}

export const updateNews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createNewsDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { title, content } = parsed.data;

        const news = await News.findById(req.params.id);
        if (!news) {
            throw new NotFoundError("News not found");
        }

        if (title && title !== news.title) {
            const exists = await checkIfExists(News, {title, content});
            if (exists) {
                throw new DuplicateError("News already exists");
            }
        }

        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "News updated successfully",
            data: updatedNews,
        });

    } catch (error) {
        next(error);
    }
};

export const deleteNews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id)
        if (!news) {
            throw new NotFoundError('News not found')
        }
        res.status(200).json({ 
            statusCode: 200, 
            message: "News deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}