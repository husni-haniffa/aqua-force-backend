import { bucket } from "../../config/gcs";

export const deleteFromGCS = async (filePath: string) => {
    if (!filePath) return;

    const file = bucket.file(filePath);
    const [exists] = await file.exists();

    if (exists) {
        await file.delete();
    }
};