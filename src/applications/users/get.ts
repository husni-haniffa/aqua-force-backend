
import { clerkClient } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors";


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
            throw new AppError('Failed to fetch users', 500)
        }

        const users = response.data.map((user: any) => ({
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