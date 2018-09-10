import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList
} from "graphql";
import { KeyValueGraphQL, KeyValueInputGraphQL } from "./Util";

export const RequestGraphQL = new GraphQLObjectType({
  name: "Request",
  description: "Details of a request made as part of a check",
  fields: () => ({
    uri: { type: new GraphQLNonNull(GraphQLString) },
    method: { type: new GraphQLNonNull(GraphQLString) },
    headers: { type: new GraphQLNonNull(new GraphQLList(KeyValueGraphQL)) }
  })
});

export const RequestInputGraphQL = new GraphQLInputObjectType({
  name: "RequestInput",
  description: "Details of a request made as part of a check",
  fields: () => ({
    uri: { type: new GraphQLNonNull(GraphQLString) },
    method: { type: new GraphQLNonNull(GraphQLString) },
    headers: { type: new GraphQLNonNull(new GraphQLList(KeyValueInputGraphQL)) }
  })
});
