import { SQSHandler, Context } from "aws-lambda";

import { RequestService, Request } from "../services/request";
import { EmailNotification } from "../handlers/notify";
import { MessagingService } from "../services/messaging";
import { Check } from "../services/check";

export const CheckHandler: SQSHandler = async (event, context) => {
  const check: Check = JSON.parse(event.Records[0].body);

  const requestResult = await RequestService.performRequest(check.request);
  console.log(JSON.stringify(requestResult));

  if (requestResult.failed == true || requestResult.statusCode >= 400) {
    for (const notification of check.notifications) {
      try {
        const messageId = await MessagingService.queueEmailNotification({
          type: "email",
          to: [notification.email],
          checkName: check.name,
          checkTime: requestResult.requestTime
        });
        console.log("Queued email notification as Message ID: " + messageId);
      } catch (error) {
        console.error(
          "Error queued email notification: " + JSON.stringify(error)
        );
      }
    }
  }
};
