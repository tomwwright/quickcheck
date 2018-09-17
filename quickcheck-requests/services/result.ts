import { GraphQL } from "../lib/graphql";
import { getParameter } from "../lib/params";

import { Result } from "quickcheck";

const PutResultMutation = `
mutation($result:ResultInput) {
  putResult(result: $result) {
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
    const response = await GraphQL.query<PutResultMutationResponse>(
      PutResultMutation,
      {
        result
      }
    );

    return response.data.Result.resultId;
  }
};