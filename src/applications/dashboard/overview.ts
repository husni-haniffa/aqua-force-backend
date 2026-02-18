import { Request, Response, NextFunction } from "express";
import Waitlist from "../../infrastructure/schema/waitlist";
import Event from "../../infrastructure/schema/events";
import Submission from "../../infrastructure/schema/submission";
import clerkClient from "@clerk/clerk-sdk-node";

export const getAdminOverview = async(
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {
       
        const [joinedUsers, waitlistApplicants, pendingSubmissions, 
                livePublications] = await Promise.all([
                    clerkClient.users.getCount(),
                    Waitlist.countDocuments(),
                    Submission.countDocuments({status: 'PENDING'}),
                    Submission.countDocuments({isPublished: true}),
                ])

                res.json({
                    users: joinedUsers,
                    waitlist: waitlistApplicants,
                    underReview: pendingSubmissions,
                    published: livePublications,
                })
       
    } catch (error) {
        next(error)
    }
}

