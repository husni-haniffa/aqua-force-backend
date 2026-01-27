import { ValidationError } from "../../../domain/errors"
import Submission from "../../../infrastructure/schema/submission"

export enum SubmissionStatus {
    PENDING = "PENDING",
    UNDER_REVIEW = "UNDER_REVIEW",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
}

export enum AccessLevel {
    PUBLIC = "PUBLIC",
    MEMBERS = "MEMBERS"
}

interface UpdateSubmissionParams {
    id: string
    allowedStatus: SubmissionStatus | SubmissionStatus[]
    update: Record<string, any>
}

export const updateSubmission = async ({id, allowedStatus, update}: UpdateSubmissionParams) => {
    const statusCondition = Array.isArray(allowedStatus) ? { $in: allowedStatus} : allowedStatus

    const updated = await Submission.findOneAndUpdate(
        {_id: id, status: statusCondition},
        update,
        {new: true}
    )
    if (!updated) {
        throw new ValidationError("Invalid submission state transition")
    }

    return updated
}