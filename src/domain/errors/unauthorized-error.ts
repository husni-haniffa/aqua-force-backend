import AppError from "./app-error";

export default class UnauthorizedError extends AppError {
    constructor(message: string = "Authentication required") {
        super(message, 401);
    }
}
