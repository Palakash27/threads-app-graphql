const queries = {};

const mutation = {
    createUser: async (
        _: any,
        { firstName, lastName, email, password }: any
    ) => {
        // const user = await prisma.user.create({
        //     data: {
        //         firstName,
        //         lastName,
        //         email,
        //         password,
        //     },
        // });
        return "user generated";
    },
};

export const resolvers = { queries, mutation };
