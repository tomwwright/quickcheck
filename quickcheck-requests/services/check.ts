import { GraphQL } from "../lib/graphql";
import { getParameter } from "../lib/params";

import { Request, Check, Notification } from "quickcheck";

const GetByScheduleQuery = `
query($schedule:String) {
  ChecksBySchedule(schedule: $schedule) {
    checkId,
    name,
    enabled,
    schedule,
    scheduleOffsetSeconds,
    notifications {
      name,
      email
    },
    request {
      uri,
      method,
      headers {
        key,
        value
      }
    }
  }
}`;

type GetByScheduleResponse = {
  data: {
    ChecksBySchedule: Check[];
  };
};

export const CheckService = {
  async getBySchedule(schedule: string): Promise<Check[]> {
    const checks: GetByScheduleResponse = await GraphQL.query<
      GetByScheduleResponse
    >(GetByScheduleQuery, {
      schedule
    });

    // fix up `headers` -- the typing is wrong because GraphQL returns a list representation
    checks.data.ChecksBySchedule.forEach(
      check =>
        (check.request.headers = convertListToMap(check.request.headers as any))
    );

    return checks.data.ChecksBySchedule;
  }
};

function convertListToMap(
  array: { key: string; value: string }[]
): { [key: string]: string } {
  return array.reduce((map, current) => {
    map[current.key] = current.value;
    return map;
  }, {});
}
