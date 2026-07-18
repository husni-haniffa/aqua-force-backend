// db/users.ts

import { clerkClient, getAuth } from '@clerk/express'; // or '@clerk/express', whichever you're using
import { User } from '../../infrastructure/schema/user';

import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from '../../domain/errors';

export async function upsertUser(clerkUserId: string) {
    // Try to find first — if they already exist, skip the extra Clerk API call entirely
    const existing = await User.findOne({ clerkUserId });
    if (existing) return existing;

    // Only fetch full profile from Clerk on first-time creation
    const clerkUser = await clerkClient.users.getUser(clerkUserId);

    const name = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || 'Unknown';

    // Clerk's primary email is identified by primaryEmailAddressId, not just the first item in the array
    const primaryEmail = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress ?? '';

    const phoneNumber = clerkUser.phoneNumbers?.[0]?.phoneNumber;

    try {
        return await User.findOneAndUpdate(
            { clerkUserId },
            {
                $setOnInsert: {
                    clerkUserId,
                    name,
                    email: primaryEmail,
                    phoneNumber,
                },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    } catch (err: any) {
        if (err.code === 11000) {
            return await User.findOne({ clerkUserId }); // race: someone else just created it
        }
        throw err;
    }
}

export const verifyUserOnboarded = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
    try {
        const { userId } = getAuth(req)
        if(!userId) {
            throw new UnauthorizedError()
        }
        await upsertUser(userId)
        
    } catch (error) {
        next(error)
    }
} 