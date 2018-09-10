import { GraphQLObjectType } from "graphql";

import { CheckQueries } from "./queries/Check";
import { ResultQueries } from "./queries/Result";

export const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...CheckQueries,
    ...ResultQueries
  })
});
