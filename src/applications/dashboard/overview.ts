import { Request, Response, NextFunction } from "express";
import Submission from "../../infrastructure/schema/submission";
import clerkClient from "@clerk/clerk-sdk-node";

export const getAdminOverview = async(
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {
       
        const [joinedUsers, pendingSubmissions, 
                livePublications] = await Promise.all([
                    clerkClient.users.getCount(),
                    Submission.countDocuments({status: 'PENDING'}),
                    Submission.countDocuments({isPublished: true}),
                ])

                res.json({
                    users: joinedUsers,
                    underReview: pendingSubmissions,
                    published: livePublications,
                })
       
    } catch (error) {
        next(error)
    }
}

