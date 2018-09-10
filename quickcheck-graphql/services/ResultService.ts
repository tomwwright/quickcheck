import { client, mapper } from "../lib/mapper";
import { between } from "@aws/dynamodb-expressions";

import { Result } from "../models/Result";

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
  }
};
