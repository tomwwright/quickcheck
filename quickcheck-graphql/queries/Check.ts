import { GraphQLString, GraphQLList } from "graphql";

import { CheckGraphQL } from "../types/Check";

import { CheckService } from "../services/CheckService";

export const CheckQueries = {
  Check: {
    type: CheckGraphQL,
    args: {
      checkId: {
        type: GraphQLString
      }
    },
    async resolve(obj, args) {
      return CheckService.getById(args.checkId);
    }
  },
  ChecksBySchedule: {
    type: new GraphQLList(CheckGraphQL),
    args: {
      schedule: {
        type: GraphQLString
      }
    },
    async resolve(obj, args) {
      const checks = await CheckService.getBySchedule(args.schedule, false);

      // typing gets a bit screwy
      const transformedChecks: any = checks;
      transformedChecks.forEach(check => {
        check.request.headers = convertMapToList(check.request.headers);
      });

      return transformedChecks;
    }
  }
};

function convertMapToList(map: {
  [key: string]: string;
}): { key: string; value: string }[] {
  const list = [];

  for (const key in map) {
    list.push({ key: key, value: map[key] });
  }

  return list;
}
