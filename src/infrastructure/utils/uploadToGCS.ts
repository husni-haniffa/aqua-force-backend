
import { v4 as uuid } from 'uuid';
import { bucket } from '../../config/gcs';

export const uploadToGCS = async (
    file: Express.Multer.File,
    userId: string
): Promise<string> => {

    const safeUserId = userId.replace(/[^a-zA-Z0-9_-]/g, '');

    const filePath = `submissions/${safeUserId}/${safeUserId}-${uuid()}-${file.originalname}`;

    const blob = bucket.file(filePath);

    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', reject);

        blobStream.on('finish', async () => {
            
            resolve(filePath);
        });

        blobStream.end(file.buffer);
    });
};
