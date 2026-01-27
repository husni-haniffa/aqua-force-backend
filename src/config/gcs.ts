import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export const bucket = storage.bucket(
    process.env.GCLOUD_BUCKET_NAME as string
);
