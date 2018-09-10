import { GraphQLString } from "graphql";

import { ResultGraphQL, ResultInputGraphQL } from "../types/Result";

import { ResultService } from "../services/ResultService";

export const ResultMutations = {
  Result: {
    type: ResultGraphQL,
    args: {
      result: {
        type: ResultInputGraphQL
      }
    },
    async resolve(obj, args) {
      return ResultService.put(args.result);
    }
  }
};
