import { bucket } from "../../config/gcs";
import { createUploader } from "../../domain/errors";

export const imageUpload = createUploader({
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    maxSizeMB: 5,
});

export const getPublicUrlFromPath = (filePath: string) => {
    return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
};