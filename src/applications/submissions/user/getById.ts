import { Request, Response, NextFunction } from "express";
import { getSignedDownloadUrl } from "../helper";
import Submission from "../../../infrastructure/schema/submission";
import { NotFoundError, UnauthorizedError } from "../../../domain/errors";
import { getAuth } from "@clerk/express";

export const getSubmissionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { userId } = getAuth(req);

        if (!userId) {
            throw new UnauthorizedError();
        }

        const submission = await Submission.findOne({
            _id: id,
            userId,
        }).populate([
            { path: "categoryId", select: "name" },
            { path: "researchTypeId", select: "name" },
        ]);

        if (!submission) {
            throw new NotFoundError("Submission not found");
        }

        const filePath = await getSignedDownloadUrl(submission.filePath);

        res.status(200).json({
            statusCode: 200,
            data: {
                ...submission.toObject(),
                filePath,
            },
        });
    } catch (error) {
        next(error);
    }
};