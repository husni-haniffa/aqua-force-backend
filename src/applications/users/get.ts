import clerkClient from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";


export const getUserList = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const response = await clerkClient.users.getUserList({
            orderBy: '-created_at'
        })

        if(!response) {
            throw new Error('Failed to fetch users')
        }

        const users = response.map(user => ({
            userId: user.id,
            emailAddress: user.emailAddresses[0]?.emailAddress || null,
            phoneNumber: user.phoneNumbers[0]?.phoneNumber || null,
            role: user.publicMetadata?.role || null,
            firstName: user.firstName,
            lastName: user.lastName
        }));

        return res.json({
            statusCode: 200,
            data: users,
        })
    } catch (error) {

        throw next(error);
    }
}