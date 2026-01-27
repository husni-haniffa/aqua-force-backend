import { Request, Response, NextFunction } from "express";
import { SubmissionStatus, updateSubmission } from "./helper";
import { ValidationError } from "../../../domain/errors";
import Submission from "../../../infrastructure/schema/submission";

export const statusUnderReview = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updated = await updateSubmission({
            id: req.params.id,
            allowedStatus: SubmissionStatus.PENDING,
            update: { status: SubmissionStatus.UNDER_REVIEW },
        })

        res.status(200).json({
            message: "Submission moved to under review",
            data: updated,
        })
    } catch (error) {
        next(error)
    }
}

export const statusApproved = async (
     req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updated = await updateSubmission({
            id: req.params.id,
            allowedStatus: SubmissionStatus.UNDER_REVIEW,
            update: { status: SubmissionStatus.ACCEPTED },
        })

        res.status(200).json({
            message: "Submission approved",
            data: updated,
        })
    } catch (error) {
        next(error)
    }
}

export const statusReject = async (
     req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updated = await updateSubmission({
            id: req.params.id,
            allowedStatus: SubmissionStatus.UNDER_REVIEW,
            update: { status: SubmissionStatus.REJECTED },
        })

        res.status(200).json({
            message: "Submission rejected",
            data: updated,
        })
    } catch (error) {
        next(error)
    }
}

export const publishSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accessLevel } = req.body 

        if (!["PUBLIC", "MEMBERS"].includes(accessLevel)) {
            throw new ValidationError("Invalid access level")
        }

        const updated = await Submission.findOneAndUpdate(
            {
                _id: req.params.id,
                status: SubmissionStatus.ACCEPTED,
            },
            {
                isPublished: true,
                accessLevel,
            },
            { new: true }
        )

        if (!updated) {
            throw new ValidationError(
                "Submission must be accepted before publishing"
            )
        }

        res.status(200).json({
            message: "Submission published successfully",
            data: updated,
        })
    } catch (error) {
        next(error)
    }
}



