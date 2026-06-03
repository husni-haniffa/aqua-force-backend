import { Request, Response, NextFunction } from 'express';
import { clerkClient, User } from '@clerk/express';
import ResearchHelp from '../../infrastructure/schema/research-help';
import ResearchIdea from '../../infrastructure/schema/research-idea';
import ResearchSupervisor from '../../infrastructure/schema/research-supervisor';
import ResearchFunding from '../../infrastructure/schema/research-funding';
import ResearchPlacement from '../../infrastructure/schema/research-placement';
import ResearchStudent from '../../infrastructure/schema/research-students';
import Submission from '../../infrastructure/schema/submission';
import Event from '../../infrastructure/schema/events';
import { formatTimestamps } from '../../infrastructure/utils/formatTimeStamps';

export const getAdminDashboardStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const seventyTwoHoursAgo = Date.now() - 72 * 60 * 60 * 1000;

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 14);
        endDate.setHours(23, 59, 59, 999);

        const [
            totalUsersCount,
            clerkUsersList,
            upcomingEventsRaw,
            pendingSub,
            underReviewSub,
            rejectedSub,
            acceptedSub,
            publishedSub,
            ideaCount,
            helpCount,
            supervisorCount,
            fundingCount,
            placementCount,
            studentCount
        ] = await Promise.all([
            clerkClient.users.getCount(),
            clerkClient.users.getUserList({ limit: 500, orderBy: '-created_at' }),
            Event.find({ eventDate: { $gte: startDate, $lte: endDate } }).sort({ eventDate: 1 }).limit(3),
            Submission.countDocuments({ status: 'PENDING' }),
            Submission.countDocuments({ status: 'UNDER_REVIEW' }),
            Submission.countDocuments({ status: 'REJECTED' }),
            Submission.countDocuments({ status: 'ACCEPTED' }),
            Submission.countDocuments({ isPublished: true }),
            ResearchIdea.countDocuments(),
            ResearchHelp.countDocuments(),
            ResearchSupervisor.countDocuments(),
            ResearchFunding.countDocuments(),
            ResearchPlacement.countDocuments(),
            ResearchStudent.countDocuments()
        ]);

        // 2. Safe resolution handling if SDK returns an array directly vs nested pagination
        const rawUserArray = Array.isArray(clerkUsersList)
            ? clerkUsersList
            : (clerkUsersList as any).data || [];

        // 3. Apply explicit type definition '(user: User)' to clear implicit any errors
        const recentlyJoinedCount = rawUserArray.filter(
            (user: User) => user.createdAt >= seventyTwoHoursAgo
        ).length;

        const formattedEvents = formatTimestamps(upcomingEventsRaw);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Admin overview statistics populated successfully",
            data: {
                users: {
                    total: totalUsersCount,
                    recentlyJoined: recentlyJoinedCount
                },
                submissions: {
                    pending: pendingSub,
                    underReview: underReviewSub,
                    rejected: rejectedSub,
                    accepted: acceptedSub,
                    published: publishedSub,
                    total: pendingSub + underReviewSub + rejectedSub + acceptedSub
                },
                applications: {
                    idea: ideaCount,
                    help: helpCount,
                    supervisor: supervisorCount,
                    funding: fundingCount,
                    placement: placementCount,
                    student: studentCount,
                    total: ideaCount + helpCount + supervisorCount + fundingCount + placementCount + studentCount
                },
                upcomingEvents: formattedEvents
            }
        });

    } catch (error) {
        next(error);
    }
};
