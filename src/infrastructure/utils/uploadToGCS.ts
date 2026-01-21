import { v4 as uuid } from 'uuid';
import { bucket } from '../../config/gcs';
import { deleteFromGCS } from "../../infrastructure/utils/deleteFromGCS";

type UploadToGCSParams = {
    file: Express.Multer.File;
    ownerId: string;     
    folder: string;          
    visibility: 'public' | 'private';
    oldFilePath?: string;    
};

export const uploadToGCS = async ({
    file,
    ownerId,
    folder,
    visibility,
    oldFilePath,
}: UploadToGCSParams): Promise<string> => {

    const safeOwnerId = ownerId?.replace(/[^a-zA-Z0-9_-]/g, '');

    if (oldFilePath) {
        await deleteFromGCS(oldFilePath);
    }

    const filePath = oldFilePath ?? `${visibility}/${folder}/${safeOwnerId}/${uuid()}-${file.originalname}`;
    const blob = bucket.file(filePath);

    const stream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
    });

    await new Promise<void>((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(file.buffer);
    });

    return filePath;
};



