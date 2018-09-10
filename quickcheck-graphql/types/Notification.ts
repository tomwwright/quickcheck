import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList
} from "graphql";

export const NotificationGraphQL = new GraphQLObjectType({
  name: "Notification",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

export const NotificationInputGraphQL = new GraphQLInputObjectType({
  name: "NotificationInput",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});
