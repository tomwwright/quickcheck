import { client, mapper } from "../lib/mapper";
import { equals } from "@aws/dynamodb-expressions";

import { Check } from "../models/Check";
import { Schedule } from "../models/Schedule";

export const CheckService = {
  getById(checkId: string): Promise<Check> {
    const checkQuery = new Check();
    checkQuery.checkId = checkId;

    return mapper.get(checkQuery);
  },
  async getBySchedule(
    schedule: Schedule,
    includeDisabled: boolean
  ): Promise<Check[]> {
    const checks = [];

    const results = mapper.query({
      valueConstructor: Check,
      indexName: "Schedule",
      keyCondition: {
        schedule: schedule
      },
      filter: {
        ...equals(true),
        subject: "enabled"
      }
    });

    for await (const result of results) {
      checks.push(result);
    }

    return checks;
  }
};
