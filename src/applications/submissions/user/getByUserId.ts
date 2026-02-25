import { Request, Response, NextFunction } from "express"; 
import { getSignedDownloadUrl } from "../helper";
import Submission from "../../../infrastructure/schema/submission";
import { formatTimestamps } from "../../../infrastructure/utils/formatTimeStamps";

export const getSubmissionByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id

        const submissions = await Submission.find({ userId: id }).populate([
            { path: 'categoryId', select: 'name' },
            { path: 'researchTypeId', select: 'name' }
        ]).sort({ createdAt: -1 })

        const response = await Promise.all(
            submissions.map(async (submission) => ({
                ...submission.toObject(),
                fileUrl: await getSignedDownloadUrl(submission.filePath),
            }))
        );

          const formatReponse = formatTimestamps(response)
       
               res.status(200).json({
                   statusCode: 200,
                   data: formatReponse,
               })
    } catch (error) {
        next(error);
    }
};