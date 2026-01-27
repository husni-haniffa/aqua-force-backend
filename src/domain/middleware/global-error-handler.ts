import { Request, Response, NextFunction } from "express";
import AppError from "../errors/app-error";

const GlobalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
        });
    }

    console.error(error);

    return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
    });
};

export default GlobalErrorHandler;
