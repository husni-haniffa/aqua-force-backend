import { Request, Response, NextFunction } from "express";
import Submission from "../../infrastructure/schema/submission";
import { getSignedDownloadUrl } from "../submissions/helper";

export const getPublishedPapers = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const submissions = await Submission.find({
            isPublished: true,
        }).sort({ createdAt: -1 }).populate([
            { path: 'categoryId', select: 'name' },
            { path: 'researchTypeId', select: 'name' }
        ]);

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