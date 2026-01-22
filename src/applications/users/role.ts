import clerkClient from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export const updateRoleToAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.id

        const updatedUser = await clerkClient.users.updateUser(userId,
            {
                publicMetadata: {
                    role: 'admin'
                }
            }
        )

        return res.status(200).json({
            statusCode: 200,
            message: 'User role updated to admin',
        })
    } catch (error) {
        next(error)
    }
}

export const removeAdminRole = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.id

        const currentUser = await clerkClient.users.getUser(userId);

        const { role, ...restMetadata } = currentUser.publicMetadata as any;

        const updatedUser = await clerkClient.users.updateUser(userId, {
            publicMetadata: restMetadata
        });

        return res.status(200).json({
            statusCode: 200,
            message: 'Admin role removed successfully',
            user: {
                userId: updatedUser.id,
                role: updatedUser.publicMetadata.role || null
            }
        });
    } catch (error) {
        next(error);
    }
};