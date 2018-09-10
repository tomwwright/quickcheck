import { GraphQLString, GraphQLList } from "graphql";

import { ResultGraphQL } from "../types/Result";

import { ResultService } from "../services/ResultService";

export const ResultQueries = {
  Result: {
    type: ResultGraphQL,
    args: {
      resultId: {
        type: GraphQLString
      }
    },
    async resolve(obj, args) {
      return ResultService.getById(args.resultId);
    }
  },
  CheckResultsByDatetime: {
    type: new GraphQLList(ResultGraphQL),
    args: {
      checkId: {
        type: GraphQLString
      },
      startDatetime: {
        type: GraphQLString
      },
      endDatetime: {
        type: GraphQLString
      }
    },
    async resolve(obj, args) {
      const startDatetime = new Date(args.startDatetime);
      const endDatetime = new Date(args.endDatetime || Date.now());
      return ResultService.getByDatetimeRange(
        args.checkId,
        startDatetime,
        endDatetime
      );
    }
  }
};
