import { GraphQLObjectType } from "graphql";

import { CheckQueries } from "./queries/Check";

export const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...CheckQueries
  })
});
