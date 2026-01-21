import multer from 'multer';

const storage = multer.memoryStorage();

type UploadOptions = {
    allowedMimeTypes: string[];
    maxSizeMB: number;
};

export const createUploader = ({ allowedMimeTypes, maxSizeMB }: UploadOptions) =>
    multer({
        storage,
        limits: {
            fileSize: maxSizeMB * 1024 * 1024,
        },
        fileFilter(req, file, cb) {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                cb(new Error(`Invalid file type: ${file.mimetype}`));
                return;
            }
            cb(null, true);
        },
    });
