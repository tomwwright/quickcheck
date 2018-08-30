import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

export const KeyValueGraphQL = new GraphQLObjectType({
  name: "KeyValueTuple",
  fields: () => ({
    key: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});
