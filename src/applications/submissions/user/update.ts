import { Request, Response, NextFunction } from "express";
import { DuplicateError, NotFoundError, ValidationError } from "../../../domain/errors";
import Submission from "../../../infrastructure/schema/submission";
import { uploadToGCS } from "../../../infrastructure/utils/uploadToGCS";
import { createSubmissionDTO } from "../../../domain/dtos/submission";
import { checkIfExists } from "../../../infrastructure/utils/checkIfExists";

export const updateSubmission = async (
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

        const parsed = createSubmissionDTO.safeParse({
            ...req.body,
            keywords: JSON.parse(req.body.keywords),
        });

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { userId } = parsed.data;

        let filePath = submission.filePath;

        if (req.file) {
            filePath = await uploadToGCS({
                file: req.file,
                ownerId: userId,
                folder: 'submissions',
                visibility: 'private',
                oldFilePath: submission.filePath,
            });
        }

     

        await Submission.findByIdAndUpdate(
            id,
            {...parsed.data, filePath},
            { new: true, runValidators: true }
        );

        res.status(200).json({
            statusCode: 200,
            message: 'Submission updated successfully',
        });
    } catch (error) {
        next(error);
    }
};
