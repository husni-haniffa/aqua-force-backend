import AppError from "./app-error";

export default class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}