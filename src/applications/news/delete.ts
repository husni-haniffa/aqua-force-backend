import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../domain/errors";
import News from "../../infrastructure/schema/news";
import { deleteFromGCS } from "../../infrastructure/utils/deleteFromGCS";

export const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            throw new NotFoundError("News not found");
        }

        if (news.imagePath) {
            await deleteFromGCS(news.imagePath);
        }

        await news.deleteOne();

        res.status(200).json({
            statusCode: 200,
            message: "News deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
