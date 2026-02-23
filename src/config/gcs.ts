import { Storage } from "@google-cloud/storage";

function getGCredentials() {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
        return {
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
            projectId: process.env.GCLOUD_PROJECT_ID,
        };
    }
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        return {
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            projectId: process.env.GCLOUD_PROJECT_ID,
        };
    }

    throw new Error("❌ No Google Cloud credentials found");
}

export const storage = new Storage(getGCredentials());

export const bucket = storage.bucket(
    process.env.GCLOUD_BUCKET_NAME as string
);