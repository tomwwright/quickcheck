import { SQS } from "aws-sdk";

import { queueMessage, constructQueueUrl } from "../lib/sqs";
import { getParameter } from "../lib/params";

import { Check } from "quickcheck";
import { EmailNotification } from "../handlers/notify";

const EmailNotificationQueueUrl = constructQueueUrl(
  getParameter("EMAIL_NOTIFICATION_QUEUE")
);
const CheckQueueUrl = constructQueueUrl(getParameter("CHECK_QUEUE"));

export const MessagingService = {
  queueEmailNotification: (notification: EmailNotification) =>
    queueMessage(EmailNotificationQueueUrl, notification),
  queueCheck: (check: Check) => queueMessage(CheckQueueUrl, check, check.scheduleOffsetSeconds)
};
