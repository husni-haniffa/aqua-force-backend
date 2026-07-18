import { User } from "../../infrastructure/schema/user";
import { NotFoundError } from "../../domain/errors";

export const getUserById = async (userId: string) => {
    const user = await User.findOne({
        clerkUserId: userId,
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;
};