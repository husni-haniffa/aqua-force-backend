import { Request, Response, NextFunction } from "express";
import AppError from "../errors/app-error";

const GlobalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    if (error.status === 413 || error.type === 'entity.too.large') {
        return res.status(413).json({
            statusCode: 413,
            message: 'File too large. Please upload a smaller file.',
        });
    }

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
