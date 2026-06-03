import { Request, Response, NextFunction } from "express";
import { DuplicateError, UnauthorizedError, ValidationError } from "../../../domain/errors";
import { createSubmissionDTO } from "../../../domain/dtos/submission";
import { checkIfExists } from "../../../infrastructure/utils/checkIfExists";
import Submission from "../../../infrastructure/schema/submission";
import { uploadToGCS } from "../../../infrastructure/utils/uploadToGCS";
import { getAuth } from "@clerk/express";

export const createSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            throw new ValidationError('File is required');
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

        const { title } = parsed.data;

        const exists = await checkIfExists(Submission, { title });
        if (exists) {
            throw new DuplicateError("Title already exists");
        }

        const filePath = await uploadToGCS({
            file: req.file,
            ownerId: userId,
            folder: 'submissions',
            visibility: 'private',
        });

        await Submission.create({
            ...parsed.data,
            filePath,
        });

        res.status(201).json({
            statusCode: 201,
            message: "Submission created successfully",
        });

    } catch (error) {
        next(error);
    }
};