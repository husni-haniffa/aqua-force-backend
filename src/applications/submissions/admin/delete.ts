import { Request, Response, NextFunction } from "express";
import Submission from "../../../infrastructure/schema/submission";
import { NotFoundError } from "../../../domain/errors";
import { deleteFromGCS } from "../../../infrastructure/utils/deleteFromGCS";

export const deleteSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const submission = await Submission.findById(id);
        if (!submission) {
            throw new NotFoundError('Submission not found');
        }

        await deleteFromGCS(submission.filePath);
        await submission.deleteOne();

        res.status(200).json({
            statusCode: 200,
            message: 'Submission deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};