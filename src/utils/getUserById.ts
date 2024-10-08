import { TUser } from "../interfaces/interfaces";

export const getUserById = (users: TUser[], searchUserId: string) => {
    const user = users.find((users) => users.userId === searchUserId);
    return user as TUser;
};
