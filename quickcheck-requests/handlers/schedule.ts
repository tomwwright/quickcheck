import { Handler, Context } from "aws-lambda";

import { CheckService } from "../services/check";
import { MessagingService } from "../services/messaging";

type ScheduleParameters = {
  schedule: string;
};

type ScheduleEventHandler = Handler<ScheduleParameters, void>;

export const ScheduleHandler: ScheduleEventHandler = async (event, context) => {
  console.log("Scheduling checks for: " + event.schedule);

  const checks = await CheckService.getBySchedule(event.schedule);

  console.log(`Scheduling ${checks.length} checks...`);

  let failedChecksCount = 0;
  for (const check of checks) {
    try {
      await MessagingService.queueCheck(check);
    } catch (error) {
      console.error(
        "Error queueing check: " +
          JSON.stringify(check) +
          " " +
          JSON.stringify(error)
      );
      ++failedChecksCount;
    }
  }

  if (failedChecksCount > 0)
    context.fail(`Failed to queue ${failedChecksCount} checks!`);
};
