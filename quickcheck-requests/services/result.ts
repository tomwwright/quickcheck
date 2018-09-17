import { GraphQL } from "../lib/graphql";
import { getParameter } from "../lib/params";

import { Result } from "quickcheck";

const PutResultMutation = `
mutation($result:ResultInput) {
  Result(result: $result) {
    resultId
  }
}`;

type PutResultMutationResponse = {
  data: {
    Result: {
      resultId: string;
    };
  };
};

export const ResultService = {
  async putResult(result: Result): Promise<string> {
    // fix up `headers` and `responseHeaders` -- the typing is wrong because GraphQL requires a list representation
    const resultAsAny = result as any;
    resultAsAny.request.headers = convertMapToList(result.request.headers);
    resultAsAny.responseHeaders = convertMapToList(result.responseHeaders);

    const response = await GraphQL.query<PutResultMutationResponse>(
      PutResultMutation,
      {
        result: resultAsAny
      }
    );

    return response.data.Result.resultId;
  }
};

function convertMapToList(map: {
  [key: string]: string;
}): { key: string; value: string }[] {
  const array = [];
  for (var key in map) {
    if (map.hasOwnProperty(key)) array.push({ key, value: map[key] });
  }
  return array;
}
