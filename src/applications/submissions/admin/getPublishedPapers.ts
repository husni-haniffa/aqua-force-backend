import { Request, Response, NextFunction } from "express";
import Submission from "../../../infrastructure/schema/submission";
import { getSignedDownloadUrl } from "../helper";
import { formatTimestamps } from "../../../infrastructure/utils/formatTimeStamps";

export const getPublishedPapers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const submissions = await Submission.find({
            isPublished: true,
            accessLevel: "PUBLIC",
        }).sort({ createdAt: -1 })

        const response = await Promise.all(
            submissions.map(async (submission) => ({
                ...submission.toObject(),
                fileUrl: await getSignedDownloadUrl(
                    submission.filePath
                ),
            }))
        )
           const formatReponse = formatTimestamps(response)

        res.status(200).json({
            statusCode: 200,
            data: formatReponse,
        })
    } catch (error) {
        next(error)
    }
}
