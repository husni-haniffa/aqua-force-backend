import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { UnauthorizedError, ForbiddenError } from "../errors";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, sessionClaims } = getAuth(req);

        if (!userId) {
            return next(new UnauthorizedError());
        }

        const role = (sessionClaims?.metadata as any)?.role;

        if (role !== "admin") {
            return next(new ForbiddenError("Admin access required"));
        }

        next();
    } catch (error) {
        next(error);
    }
};

const SUPER_ADMIN_EMAILS = [
    'husniwfayo@gmail.com',
    'epdarshananuwan@gmail.com',
    'udithathejan@gmail.com',
    'mrinduniltharaka@gmail.com'
];

export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, sessionClaims } = getAuth(req);

        if (!userId) {
            return next(new UnauthorizedError());
        }

        const email = (sessionClaims?.email as string) ?? "";

        if (!SUPER_ADMIN_EMAILS.includes(email)) {
            return next(new ForbiddenError("You do not have permission to perform this action"));
        }

        next();
    } catch (error) {
        next(error);
    }
};