import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLList
} from "graphql";

import { RequestGraphQL } from "./Request";
import { NotificationGraphQL } from "./Notification";

export const CheckGraphQL = new GraphQLObjectType({
  name: "Check",
  description: "A check to be made periodically",
  fields: () => ({
    checkId: { type: GraphQLID },
    name: { type: GraphQLString },
    schedule: { type: GraphQLString },
    scheduleOffsetSeconds: { type: GraphQLInt },
    enabled: { type: GraphQLBoolean },
    notifications: { type: new GraphQLList(NotificationGraphQL) },
    request: { type: RequestGraphQL }
  })
});
