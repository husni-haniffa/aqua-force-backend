import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../../domain/errors";
import ResearchSupervisor from "../../infrastructure/schema/research-supervisor";
import { createResearchSupervisorDTO } from "../../domain/dtos/research-supervisor";

export const createResearchSupervisor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = createResearchSupervisorDTO.safeParse(req.body)
        if (!parsed.success) {
            throw new ValidationError("Please fill all the required fields")
        }
        await ResearchSupervisor.create(parsed.data)
        return res.json({
            status: 201,
            message: "Research Supervisors Submitted"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllResearchSupervisor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await ResearchSupervisor.find().sort({ createdAt: -1 }).populate('categoryId', 'name')
        const researchSupervisors = response
        res.status(200).json({
            statusCode: 200,
            message: "Research Supervisors retreived successfully", data: researchSupervisors
        })
    } catch (error) {
        next(error)
    }
}

export const deleteResearchSupervisor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const supervisor = await ResearchSupervisor.findByIdAndDelete(req.params.id)
        if (!supervisor) {
            throw new NotFoundError('Application not found')
        }
        res.status(200).json({
            statusCode: 200,
            message: "Application deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}