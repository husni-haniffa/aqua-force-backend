import News from "../../infrastructure/schema/news";
import { Request, Response, NextFunction } from "express";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";

export const getAllNews = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const response = await News.find().sort({ createdAt: -1 });
        const news = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            data: news, 
        });
    } catch (error) {
        next(error);
    }
};
