import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList
} from "graphql";

export const KeyValueGraphQL = new GraphQLObjectType({
  name: "KeyValueTuple",
  fields: () => ({
    key: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});

export const KeyValueInputGraphQL = new GraphQLInputObjectType({
  name: "KeyValueInputTuple",
  fields: () => ({
    key: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});
