import { bucket } from "../../config/gcs";
import { createUploader } from "../../domain/errors";

export const getSignedDownloadUrl = async (filePath: string,  expiresInMinutes = 10): Promise<string> => {
    const file = bucket.file(filePath);

    const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + expiresInMinutes * 60 * 1000,
        responseDisposition: 'attachment',
    });

    return url;
};

export const submissionUpload = createUploader({
    allowedMimeTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxSizeMB: 10,
});

