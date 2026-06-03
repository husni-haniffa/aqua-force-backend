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