import { Request, Response, NextFunction } from "express";
import { getSignedDownloadUrl } from "../helper";
import Submission from "../../../infrastructure/schema/submission";
import { NotFoundError } from "../../../domain/errors";

export const getSubmissionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        const submission = await Submission.findById(id)
        if(!submission){
            throw new NotFoundError('Submission not found')
        }
        const filePath = await getSignedDownloadUrl(submission.filePath)

        const response = {...submission, filePath}

        res.status(200).json({
            statusCode: 200,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};