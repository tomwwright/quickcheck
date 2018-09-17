import { GraphQL } from "../lib/graphql";
import { getParameter } from "../lib/params";

import { Request, Check, Notification } from "quickcheck";

const GetByScheduleQuery = `
query($schedule:String) {
  getChecksBySchedule(schedule: $schedule) {
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
      headers
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

    return checks.data.ChecksBySchedule;
  }
};