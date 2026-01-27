import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../errors/forbidden-error";

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // @ts-ignore
    if (!req.auth) {
        throw new ForbiddenError("Authentication required");
    }
    
    // @ts-ignore
    const { sessionClaims } = req.auth;

    const role = sessionClaims?.metadata?.role 

    if (role !== "admin") {
        throw new ForbiddenError("Admin access required");
    }

    next();
};