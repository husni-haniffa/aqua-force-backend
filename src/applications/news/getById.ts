import { Request, Response, NextFunction } from "express";
import News from "../../infrastructure/schema/news";
import { NotFoundError } from "../../domain/errors";

export const getNewsById = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            throw new NotFoundError("News not found");
        }

        res.status(200).json({
            statusCode: 200,
            data: news,
        });
    } catch (error) {
        next(error);
    }
};
