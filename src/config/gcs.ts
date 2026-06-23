import { Storage } from "@google-cloud/storage";
import { AppError } from "../domain/errors";

function getGCredentials() {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
        return {
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
            projectId: process.env.GCLOUD_PROJECT_ID,
        };
    }

    throw new AppError("❌ No Google Cloud credentials found", 500);
}

export const storage = new Storage(getGCredentials());

export const bucket = storage.bucket(
    process.env.GCLOUD_BUCKET_NAME as string
);