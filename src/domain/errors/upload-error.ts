import multer, { MulterError } from 'multer';
import AppError from '../errors/app-error';
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage();

type UploadOptions = {
    allowedMimeTypes: string[];
    maxSizeMB: number;
};

export const createUploader = ({ allowedMimeTypes, maxSizeMB }: UploadOptions) => {
    const upload = multer({
        storage,
        limits: {
            fileSize: maxSizeMB * 1024 * 1024,
        },
        fileFilter(req, file, cb) {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                cb(new AppError(`Invalid file type: ${file.mimetype}. Allowed types: ${allowedMimeTypes.join(', ')}`, 400) as any);
                return;
            }
            cb(null, true);
        },
    });

    // Return a wrapper that catches multer errors and forwards to GlobalErrorHandler
    return {
        single: (fieldName: string) =>
            (req: Request, res: Response, next: NextFunction) => {
                upload.single(fieldName)(req, res, (err) => {
                    if (!err) return next();

                    if (err instanceof MulterError) {
                        if (err.code === 'LIMIT_FILE_SIZE') {
                            return next(new AppError(`File too large. Maximum allowed size is ${maxSizeMB}MB.`, 400));
                        }
                        return next(new AppError(`Upload error: ${err.message}`, 400));
                    }

                    // fileFilter errors (AppError or plain Error)
                    if (err instanceof AppError) return next(err);
                    return next(new AppError(err.message || 'File upload failed', 400));
                });
            },
    };
};