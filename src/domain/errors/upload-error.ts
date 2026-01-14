import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, 
    },
    fileFilter(req, file, cb) {
        const allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new Error('Only PDF and Word files are allowed'));
            return;
        }

        cb(null, true);
    },
});
