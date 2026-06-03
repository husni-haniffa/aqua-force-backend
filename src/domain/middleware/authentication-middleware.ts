import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../domain/errors";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorizedError());
        }
        next();
    } catch (error) {
        next(error);
    }
};