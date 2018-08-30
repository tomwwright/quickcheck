import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { KeyValueGraphQL } from "./Util";

export const RequestGraphQL = new GraphQLObjectType({
  name: "Request",
  description: "Details of a request made as part of a check",
  fields: () => ({
    uri: { type: GraphQLString },
    method: { type: GraphQLString },
    headers: { type: new GraphQLList(KeyValueGraphQL) }
  })
});
