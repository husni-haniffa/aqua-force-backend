import { Request, Response, NextFunction } from "express";
import { getSignedDownloadUrl } from "../helper";
import Submission from "../../../infrastructure/schema/submission";
import { NotFoundError } from "../../../domain/errors";
import { formatTimestamps } from "../../../infrastructure/utils/formatTimeStamps";

export const getSubmissionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        const submission = await Submission.findById(id).populate('categoryId', 'name');

        if (!submission) {
            throw new NotFoundError("Submission not found")
        }

        const filePath = await getSignedDownloadUrl(submission.filePath)

        const response = {
            ...submission.toObject(),
            filePath,
        }

         const formatReponse = formatTimestamps(response)

        res.status(200).json({
            statusCode: 200,
            data: formatReponse,
        })

    } catch (error) {
        next(error);
    }
};