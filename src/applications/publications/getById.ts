import { Request, Response, NextFunction } from "express";
import Submission from "../../infrastructure/schema/submission";
import { getSignedDownloadUrl } from "../submissions/helper";
import { NotFoundError } from "../../domain/errors";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";

export const getPublishedPaperById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params

        const publishedPaper = await Submission.findById(id).populate('categoryId', 'name');
        if (!publishedPaper) {
            throw new NotFoundError()
        }

        const signedUrl = await getSignedDownloadUrl(publishedPaper.filePath)

        const formattedPaper = formatTimestamps(
            publishedPaper.toObject()
        )

        res.status(200).json({
            statusCode: 200,
            data: {
                ...formattedPaper,
                filePath: signedUrl
            }
        })

    } catch (error) {
        next(error)
    }
}
