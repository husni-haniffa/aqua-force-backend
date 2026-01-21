import { Request, Response, NextFunction } from "express";
import { createNewsDTO } from "../../domain/dtos/news";
import { uploadToGCS } from "../../infrastructure/utils/uploadToGCS";
import { ValidationError, DuplicateError } from "../../domain/errors";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import News from "../../infrastructure/schema/news";
import { bucket } from "../../config/gcs";

export const createNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = createNewsDTO.safeParse(req.body);
        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { title } = parsed.data;

        const exists = await checkIfExists(News, { title });
        if (exists) {
            throw new DuplicateError("Title already exists");
        }

        let imagePath: string | undefined;
        let imageUrl: string | undefined;

        if (req.file) {
            imagePath = await uploadToGCS({
                file: req.file,
                folder: "news",
                visibility: "public",
            });

            imageUrl = `https://storage.googleapis.com/${bucket.name}/${imagePath}`;
        }

        await News.create({
            ...parsed.data,
            imagePath,
            imageUrl,
        });

        res.status(201).json({
            statusCode: 201,
            message: "News created successfully",
        });
    } catch (error) {
        next(error);
    }
};
