import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    // create  graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
            type Mutation {
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `, // GraphQL schema
        resolvers: {
            Query: {
                hello: () => "Hello World!",
                say: (_, { name }: { name: String }) =>
                    `Hello ${name}, how are you?`,
            },
            Mutation: {
                createUser: async (
                    _,
                    {
                        firstName,
                        lastName,
                        email,
                        password,
                    }: {
                        firstName: string;
                        lastName: string;
                        email: string;
                        password: string;
                    }
                ) => {
                    await prismaClient.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt: "random_salt",
                        },
                    });
                    return true;
                },
            },
        },
    });

    // Start gql server
    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({ message: "Serve is up and running!" });
    });

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
init();
