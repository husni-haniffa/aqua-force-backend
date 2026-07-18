import { Request, Response, NextFunction } from "express";
import { AppError, DuplicateError, NotFoundError, UnauthorizedError, ValidationError } from "../../../domain/errors";
import Submission from "../../../infrastructure/schema/submission";
import { uploadToGCS } from "../../../infrastructure/utils/uploadToGCS";
import { createSubmissionDTO } from "../../../domain/dtos/submission";
import { checkIfExists } from "../../../infrastructure/utils/checkIfExists";
import { getAuth } from "@clerk/express";

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

        const canEdit =
            submission.status === 'PENDING' ||
            (submission.status === 'CHANGES_REQUESTED' && submission.revisionCount === 0);

        if (!canEdit) {
            throw new AppError('Submission can no longer be edited', 403);
        }

        const parsed = createSubmissionDTO.safeParse({
            ...req.body,
            keywords: JSON.parse(req.body.keywords),
        });

        if (!parsed.success) {
            throw new ValidationError("Please fill all the required fields")
        }

        const { userId } = getAuth(req)

        if (!userId) {
            throw new UnauthorizedError()
        }

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

        const updatePayload: Record<string, any> = { ...parsed.data, filePath };

        if (submission.status === 'CHANGES_REQUESTED') {
            updatePayload.status = 'UNDER_REVIEW'; 
            updatePayload.revisionCount = 1;  
        }

        await Submission.findByIdAndUpdate(
            id,
            updatePayload,
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