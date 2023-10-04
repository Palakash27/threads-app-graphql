import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
    getUserToken: async (
        _: any,
        { email, password }: { email: string; password: string }
    ) => {
        const token = await UserService.getUserToken({ email, password });
        return token;
    },
};

const mutation = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    },
};

export const resolvers = { queries, mutation };
