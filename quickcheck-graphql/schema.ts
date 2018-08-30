import { GraphQLSchema } from "graphql";

import { RootQuery } from "./query";

import { RequestGraphQL } from "./types/Request";
import { CheckGraphQL } from "./types/Check";
import { NotificationGraphQL } from "./types/Notification";
import { ResultGraphQL } from "./types/Result";

export const Schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  types: [RequestGraphQL, CheckGraphQL, NotificationGraphQL, ResultGraphQL]
});
