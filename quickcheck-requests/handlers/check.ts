import { SQSHandler, Context } from "aws-lambda";

import { RequestService, Request, RequestResult } from "../services/request";
import { ResultService, Result } from "../services/result";
import { EmailNotification } from "../handlers/notify";
import { MessagingService } from "../services/messaging";
import { Check, Notification } from "../services/check";

export const CheckHandler: SQSHandler = async (event, context) => {
  const check: Check = JSON.parse(event.Records[0].body);

  const requestResult = await RequestService.performRequest(check.request);
  console.log(JSON.stringify(requestResult));

  var failedInsertingResult = false;
  try {
    const result: Result = createResult(check, requestResult);
    const resultId = await ResultService.putResult(result);
    console.log("Inserted result with Result ID: " + resultId);
  } catch (error) {
    failedInsertingResult = true;
    console.error("Error inserting result: " + JSON.stringify(error));
  }

  var failedEmailNotifications = [];
  if (shouldSendNotifications(requestResult)) {
    const failedEmailNotifications = queueNotifications(
      check.name,
      requestResult.datetime,
      check.notifications
    );
  }

  if (failedEmailNotifications.length > 0 || failedInsertingResult) {
    context.fail(
      `Failed email notifications: ${
        failedEmailNotifications.length
      }, failed to insert result: ${failedInsertingResult}`
    );
  }
};

async function queueNotifications(
  checkName: string,
  datetime: string,
  notifications: Notification[]
): Promise<Notification[]> {
  const failedEmailNotifications: Notification[] = [];
  for (const notification of notifications) {
    try {
      const messageId = await MessagingService.queueEmailNotification({
        type: "email",
        to: [notification.email],
        checkName: checkName,
        datetime: datetime
      });
      console.log("Queued email notification as Message ID: " + messageId);
    } catch (error) {
      failedEmailNotifications.push(notification);
      console.error(
        "Error queueing email notification: " + JSON.stringify(error)
      );
    }
  }
  return failedEmailNotifications;
}

function createResult(check: Check, requestResult: RequestResult): Result {
  return {
    checkId: check.checkId,
    request: check.request,
    datetime: requestResult.datetime,
    elapsedMillis: requestResult.elapsedMillis,
    statusCode: requestResult.statusCode,
    body: requestResult.body,
    responseHeaders: requestResult.responseHeaders,
    message: `failed: ${requestResult.failed}`,
    sentNotifications: shouldSendNotifications(requestResult)
      ? check.notifications
      : []
  };
}

function shouldSendNotifications(requestResult: RequestResult) {
  return requestResult.failed == true || requestResult.statusCode >= 400;
}
