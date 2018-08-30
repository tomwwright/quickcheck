import { GraphQLServerLambda } from "graphql-yoga";

import { Schema } from "./schema";

const lambda = new GraphQLServerLambda({
  schema: Schema
});

export const server = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;
