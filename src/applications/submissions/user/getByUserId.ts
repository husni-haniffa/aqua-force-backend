import { Request, Response, NextFunction } from "express"; 
import { getSignedDownloadUrl } from "../helper";
import Submission from "../../../infrastructure/schema/submission";
import { getAuth } from "@clerk/express";
import { UnauthorizedError } from "../../../domain/errors";

export const getSubmissionByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id

        const { userId } = getAuth(req)
        
        if(!userId) {
            throw new UnauthorizedError()
        }

        const submissions = await Submission.find({ userId: userId }).populate([
            { path: 'categoryId', select: 'name' },
            { path: 'researchTypeId', select: 'name' }
        ]).sort({ createdAt: -1 })

        const response = await Promise.all(
            submissions.map(async (submission) => ({
                ...submission.toObject(),
                fileUrl: await getSignedDownloadUrl(submission.filePath),
            }))
        );

        res.status(200).json({
            statusCode: 200,
            data: response,
        })

    } catch (error) {
        next(error);
    }
};