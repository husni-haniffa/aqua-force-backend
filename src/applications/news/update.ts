import { Request, Response, NextFunction } from "express";
import { createNewsDTO } from "../../domain/dtos/news";
import News from "../../infrastructure/schema/news";
import { uploadToGCS } from "../../infrastructure/utils/uploadToGCS";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import { ValidationError, NotFoundError, DuplicateError } from "../../domain/errors";
import { bucket } from "../../config/gcs";

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

        const news = await News.findById(req.params.id);
        if (!news) {
            throw new NotFoundError("News not found");
        }
        
        let imagePath = news.imagePath;
        let imageUrl = news.imageUrl;

        if (req.file) {
            imagePath = await uploadToGCS({
                file: req.file,
                ownerId: news._id.toString(),
                folder: "news",
                visibility: "public",
                oldFilePath: news.imagePath ?? undefined,
            });

            imageUrl = `https://storage.googleapis.com/${bucket.name}/${imagePath}`;
        }

        await News.findByIdAndUpdate(
            req.params.id,
            { ...parsed.data, imagePath, imageUrl },
            { new: true, runValidators: true }
        )
        res.status(200).json({
            statusCode: 200,
            message: "News updated successfully",
        });
    } catch (error) {
        next(error);
    }
};
