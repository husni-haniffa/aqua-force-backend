import { Storage } from "@google-cloud/storage";
import fs from "fs";

const credentialsPath = "/tmp/service-account.json";

if (!fs.existsSync(credentialsPath)) {
    fs.writeFileSync(
        credentialsPath,
        process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON as string
    );
}

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: credentialsPath,
});

export const bucket = storage.bucket(
    process.env.GCLOUD_BUCKET_NAME as string
);
