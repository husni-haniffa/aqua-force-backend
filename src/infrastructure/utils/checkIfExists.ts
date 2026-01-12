import { Model, QueryFilter } from "mongoose";

export const checkIfExists = async <T>(
    model: Model<T>,
    query: QueryFilter<T>
): Promise<boolean> => {
    return !!(await model.exists(query));
};