import { GraphQLObjectType } from "graphql";

import { ResultMutations } from "./mutations/Result";

export const RootMutations = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...ResultMutations
  })
});
