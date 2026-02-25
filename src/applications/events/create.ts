import { Request, Response, NextFunction } from "express";
import { createEventDTO } from "../../domain/dtos/event";
import { DuplicateError, ValidationError } from "../../domain/errors";
import { checkIfExists } from "../../infrastructure/utils/checkIfExists";
import Event from "../../infrastructure/schema/events";
import mongoose from "mongoose";
import { uploadToGCS } from "../../infrastructure/utils/uploadToGCS";
import { bucket } from "../../config/gcs";

export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createEventDTO.safeParse(req.body);

        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }

        const { title } = parsed.data;
    


        const exists = await checkIfExists(Event, { title });
        if (exists) {
            throw new DuplicateError("Event already exists");
        }

        const eventId = new mongoose.Types.ObjectId();

        let imagePath: string | undefined;
        let imageUrl: string | undefined;


        if (req.file) {
                    imagePath = await uploadToGCS({
                        file: req.file,
                        ownerId: eventId.toString(),
                        folder: "events",
                        visibility: "public",
                    });
        
                    imageUrl = `https://storage.googleapis.com/${bucket.name}/${imagePath}`;
        }

        await Event.create({
                    ...parsed.data,
                    imagePath,
                    imageUrl,
                });

        res.status(201).json({
            statusCode: 201,
            message: "Event created successfully"
        });
    } catch (error) {
        next(error);
    }
};