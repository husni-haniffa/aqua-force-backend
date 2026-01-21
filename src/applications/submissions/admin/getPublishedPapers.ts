import { Request, Response, NextFunction } from "express";
import Submission from "../../../infrastructure/schema/submission";
import { getSignedDownloadUrl } from "../helper";

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

        res.status(200).json({
            statusCode: 200,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}
