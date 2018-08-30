import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

export const NotificationGraphQL = new GraphQLObjectType({
  name: "Notification",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});
