import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt
} from "graphql";
import { KeyValueGraphQL, KeyValueInputGraphQL } from "./Util";
import { RequestGraphQL, RequestInputGraphQL } from "./Request";
import { NotificationGraphQL, NotificationInputGraphQL } from "./Notification";

export const ResultGraphQL = new GraphQLObjectType({
  name: "Result",
  description: "Details of the result from running a check",
  fields: () => ({
    resultId: { type: new GraphQLNonNull(GraphQLID) },
    checkId: { type: new GraphQLNonNull(GraphQLString) },
    request: { type: new GraphQLNonNull(RequestGraphQL) },
    datetime: { type: new GraphQLNonNull(GraphQLString) },
    elapsedMillis: { type: new GraphQLNonNull(GraphQLInt) },
    statusCode: { type: new GraphQLNonNull(GraphQLInt) },
    responseHeaders: {
      type: new GraphQLList(KeyValueGraphQL)
    },
    body: { type: GraphQLString },
    message: { type: new GraphQLNonNull(GraphQLString) },
    sentNotifications: {
      type: new GraphQLNonNull(new GraphQLList(NotificationGraphQL))
    }
  })
});

export const ResultInputGraphQL = new GraphQLInputObjectType({
  name: "ResultInput",
  description: "Payload for updating or inserting a Result",
  fields: () => ({
    resultId: { type: GraphQLID },
    checkId: { type: new GraphQLNonNull(GraphQLString) },
    request: { type: new GraphQLNonNull(RequestInputGraphQL) },
    datetime: { type: new GraphQLNonNull(GraphQLString) },
    elapsedMillis: { type: new GraphQLNonNull(GraphQLInt) },
    statusCode: { type: GraphQLInt },
    responseHeaders: {
      type: new GraphQLList(KeyValueInputGraphQL)
    },
    body: { type: GraphQLString },
    message: { type: new GraphQLNonNull(GraphQLString) },
    sentNotifications: {
      type: new GraphQLNonNull(new GraphQLList(NotificationInputGraphQL))
    }
  })
});
