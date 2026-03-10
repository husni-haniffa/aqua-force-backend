import { Request, Response, NextFunction } from "express";
import { createResearchPlacementDTO } from "../../domain/dtos/research-placement";
import { ValidationError } from "../../domain/errors";
import { formatTimestamps } from "../../infrastructure/utils/formatTimeStamps";
import ResearchStudent from "../../infrastructure/schema/research-students";
import { createResearchStudentDTO } from "../../domain/dtos/research-student";

export const createResearchStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchStudentDTO.safeParse(req.body)
        if (!parsed.success) {
            throw new ValidationError(parsed.error.issues[0].message);
        }
        await ResearchStudent.create(parsed.data)
        return res.json({
            status: 201,
            message: "Research Students Submitted"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllResearchStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchStudent.find().sort({ createdAt: -1 }).populate('categoryId', 'name')
        const researchStudents = formatTimestamps(response)
        res.status(200).json({
            statusCode: 200,
            message: "Research Students retreived successfully", data: researchStudents
        })
    } catch (error) {
        next(error)
    }
}