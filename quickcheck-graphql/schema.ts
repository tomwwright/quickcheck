import { GraphQLSchema } from "graphql";

import { RootQuery } from "./query";
import { RootMutations } from "./mutation";

import { RequestGraphQL, RequestInputGraphQL } from "./types/Request";
import { CheckGraphQL } from "./types/Check";
import {
  NotificationGraphQL,
  NotificationInputGraphQL
} from "./types/Notification";
import { ResultGraphQL, ResultInputGraphQL } from "./types/Result";

export const Schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
  types: [
    RequestGraphQL,
    RequestInputGraphQL,
    CheckGraphQL,
    NotificationGraphQL,
    NotificationInputGraphQL,
    ResultGraphQL,
    ResultInputGraphQL
  ]
});
