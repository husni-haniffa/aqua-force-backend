import AppError from "./app-error";

export default class ForbiddenError extends AppError {
    constructor(message: string = "You do not have permission to perform this action") {
        super(message, 403);
    }
}
