import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt
} from "graphql";
import { KeyValueGraphQL } from "./Util";
import { RequestGraphQL } from "./Request";
import { NotificationGraphQL } from "./Notification";

export const ResultGraphQL = new GraphQLObjectType({
  name: "Result",
  description: "Details of the result from running a check",
  fields: () => ({
    resultId: { type: GraphQLID },
    checkId: { type: GraphQLString },
    request: { type: RequestGraphQL },
    timestamp: { type: GraphQLString },
    elapsedMillis: { type: GraphQLInt },
    statusCode: { type: GraphQLInt },
    responseHeaders: { type: new GraphQLList(KeyValueGraphQL) },
    body: { type: GraphQLString },
    message: { type: GraphQLString },
    sentNotifications: { type: new GraphQLList(NotificationGraphQL) }
  })
});
