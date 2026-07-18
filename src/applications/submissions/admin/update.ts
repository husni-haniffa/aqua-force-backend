import { Request, Response, NextFunction } from "express";
import { SubmissionStatus, updateSubmission } from "./helper";
import { NotFoundError, ValidationError } from "../../../domain/errors";
import Submission from "../../../infrastructure/schema/submission";
import { getUser } from "../../../infrastructure/utils/getUser";
import { sendSubmissionApprovedEmail, sendSubmissionPublishedEmail, sendSubmissionRejectedEmail, sendSubmissionRequestChangesEmail } from "../../../infrastructure/utils/emails/submission";
import { getUserById } from "../../users/getUserById";

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

export const statusRequestChanges = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            throw new ValidationError("A message explaining the requested changes is required");
        }

        const updated = await updateSubmission({
            id: req.params.id,
            allowedStatus: SubmissionStatus.UNDER_REVIEW,
            update: {
                status: SubmissionStatus.CHANGES_REQUESTED,
                reviewMessage: message.trim(),
            },
        })

        const user = await getUserById(updated.userId)

        if (user) {
            try {
                const response = await sendSubmissionRequestChangesEmail({
                    authorName: user.name,
                    email: user.email,
                    submissionTitle: updated.title,
                    requestedChanges: message.trim(),
                });
                if (!response.success) console.error('Email send failed:', response.error);
            } catch (error) {
                console.error('Unexpected error in email flow:', error);
            }
        }

        res.status(200).json({
            message: "Changes requested",
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
            allowedStatus: [SubmissionStatus.UNDER_REVIEW, SubmissionStatus.CHANGES_REQUESTED],
            update: { status: SubmissionStatus.ACCEPTED },
        })

        const user = await getUserById(updated.userId)

        if (user) {
            try {
                const response = await sendSubmissionApprovedEmail({
                    authorName: user.name,
                    email: user.email,
                    submissionTitle: updated.title
                })

                if (!response.success) {
                    console.error('Email send failed, continuing anyway:', response.error);
                }
            } catch (error) {
                console.error('Unexpected error in email flow:', error);
            }
        }
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
        const { reason } = req.body

        if (!reason || typeof reason !== "string" || !reason.trim()) {
            throw new ValidationError("A rejection reason is required");
        }

        const updated = await updateSubmission({
            id: req.params.id,
            allowedStatus: [SubmissionStatus.UNDER_REVIEW, SubmissionStatus.CHANGES_REQUESTED],
            update: {
                status: SubmissionStatus.REJECTED,
                reviewMessage: reason.trim(),
            },
        })

        const user = await getUserById(updated.userId)

        if (user) {
            try {
                const response = await sendSubmissionRejectedEmail({
                    authorName: user.name,
                    email: user.email,
                    submissionTitle: updated.title,
                    rejectedReason: reason.trim(),
                });
                if (!response.success) console.error('Email send failed:', response.error);
            } catch (error) {
                console.error('Unexpected error in email flow:', error);
            }
        }

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

        const user = await getUserById(updated.userId)

        if (user) {
            try {
                const response = await sendSubmissionPublishedEmail({
                    authorName: user.name,
                    email: user.email,
                    submissionTitle: updated.title,
                    publishedUrl: `${process.env.FRONTEND_URL}/publications/${updated._id}/read`,
                });
                if (!response.success) console.error('Email send failed:', response.error);
            } catch (error) {
                console.error('Unexpected error in email flow:', error);
            }
        }

        res.status(200).json({
            message: "Submission published successfully",
            data: updated,
        })
    } catch (error) {
        next(error)
    }
}

export const addSocialMediaLinks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id
        const { socialMediaLinks } = req.body;

        if (!socialMediaLinks || typeof socialMediaLinks !== "object") {
            return res.status(400).json({ message: "Invalid social links data" });
        }

        const submission = await Submission.findById(id);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

    

        await Submission.findByIdAndUpdate(
            id,
            {
                $set: {
                    socialMediaLinks: { ...socialMediaLinks }
                }
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Social media links added successfully",
            data: submission.socialMediaLinks
        });

    } catch (error) {
        next(error)
    }
}

export const updateSocialMediaLinks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id
        const { socialMediaLinks } = req.body;

        if (!socialMediaLinks || typeof socialMediaLinks !== "object") {
            return res.status(400).json({ message: "Invalid social links data" });
        }

        const submission = await Submission.findById(id);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        await Submission.findByIdAndUpdate(
            id,
            {
                $set: Object.fromEntries(
                    Object.entries(socialMediaLinks).map(([k, v]) => [
                        `socialMediaLinks.${k}`, v
                    ])
                )
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            message: "Social media links updated successfully",
            data: submission.socialMediaLinks
        });

    } catch (error) {
        next(error)
    }
};


