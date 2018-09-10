import { client, mapper } from "../lib/mapper";
import { between } from "@aws/dynamodb-expressions";

import { Result, ResultType } from "../models/Result";

export const ResultService = {
  getById(resultId: string): Promise<Result> {
    const resultQuery = new Result();
    resultQuery.resultId = resultId;

    return mapper.get(resultQuery);
  },
  async getByDatetimeRange(checkId, startDatetime: Date, endDatetime: Date) {
    const results = [];

    const queryResults = mapper.query({
      valueConstructor: Result,
      indexName: "CheckDatetime",
      keyCondition: {
        checkId,
        datetime: between(
          startDatetime.toISOString(),
          endDatetime.toISOString()
        )
      }
    });

    for await (const result of queryResults) {
      results.push(result);
    }

    return results;
  },

  async put(resultData: ResultType) {
    const result = new Result();
    Object.assign(result, resultData);

    return mapper.put(result);
  }
};
