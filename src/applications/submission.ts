import { Request, Response, NextFunction } from "express";
import { createSubmissionDTO } from "../domain/dtos/submission";
import ValidationError from "../domain/errors/validation-error";
import Submission from "../infrastructure/schema/submission";
import { checkIfExists } from "../infrastructure/utils/checkIfExists";
import DuplicateError from "../domain/errors/duplicate-error";
import { uploadToGCS } from "../infrastructure/utils/uploadToGCS";

export const createSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            throw new ValidationError('File is required')
        }

        const parsed = createSubmissionDTO.safeParse(req.body)
        if(!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message)
        }

        const { userId, title } = parsed.data

        const exists = await checkIfExists(Submission, { title });
        if (exists) {
            throw new DuplicateError("Title already exists");
        }

        const fileUrl = await uploadToGCS(req.file, userId)
       
        const submission = await Submission.create({...parsed.data, fileUrl})
        
        res.status(201).json({
            statusCode: 201,
            message: "Submission created successfully"
        });
     
    } catch (error) {
        next(error)
    }
}
