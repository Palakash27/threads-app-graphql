import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "./user";

async function createApolloGraphqlServer() {
    // create  graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${User.queries}
            }
            type Mutation {
                ${User.mutations}
            }
        `, // GraphQL schema
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutation,
            },
        },
    });

    // Start gql server
    await gqlServer.start();
    return gqlServer;
}

export default createApolloGraphqlServer;
