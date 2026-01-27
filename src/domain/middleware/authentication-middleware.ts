import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../errors/unauthorized-error";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    ClerkExpressRequireAuth({}) (req, res, (err?: any) => {
        if(err) {
            return next(
                new UnauthorizedError('Sign in required')
            )
        }
        next()
    })
};
