import { Storage } from "@google-cloud/storage";
import { AppError } from "../domain/errors";

function getGCredentials() {
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!key) {
        throw new AppError("❌ No Google Cloud credentials found", 500);
    }

    // If it looks like a file path, read it from disk
    if (key.startsWith(".") || key.startsWith("/")) {
        return {
            keyFilename: key,
            projectId: process.env.GCLOUD_PROJECT_ID,
        };
    }

    // Otherwise treat it as raw JSON (for production/CI)
    return {
        credentials: JSON.parse(key),
        projectId: process.env.GCLOUD_PROJECT_ID,
    };
}

export const storage = new Storage(getGCredentials());

export const bucket = storage.bucket(
    process.env.GCLOUD_BUCKET_NAME as string
);