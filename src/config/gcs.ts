import { Storage } from "@google-cloud/storage";

const storage = new Storage(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY
        ? {
            projectId: process.env.GCLOUD_PROJECT_ID,
            credentials: JSON.parse(
                process.env.GOOGLE_SERVICE_ACCOUNT_KEY
            ),
        }
        : {
            projectId: process.env.GCLOUD_PROJECT_ID,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        }
);

export const bucket = storage.bucket(
    process.env.GCLOUD_BUCKET_NAME as string
);
