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

    // @ts-ignore
    console.log('Full auth object:', req.auth);
    console.log('Session claims:', sessionClaims);

    // Check where your role is stored
    const role = 
        sessionClaims?.metadata?.role 

    console.log('Extracted role:', role);

    if (role !== "admin") {
        throw new ForbiddenError("Admin access required");
    }

    next();
};