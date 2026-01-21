import { Request, Response, NextFunction } from "express"; 
import { getSignedDownloadUrl } from "../helper";
import Submission from "../../../infrastructure/schema/submission";

export const getSubmissionByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id

        const submissions = await Submission.find({ userId: id});

        const response = await Promise.all(
            submissions.map(async (submission) => ({
                ...submission.toObject(),
                fileUrl: await getSignedDownloadUrl(submission.filePath),
            }))
        );

        res.status(200).json({
            statusCode: 200,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};