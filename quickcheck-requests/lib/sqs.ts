import { SQS } from "aws-sdk";

import { getParameter } from "./params";

const isOffline = getParameter("IS_OFFLINE") == "true";
const awsRegion = getParameter("AWS_REGION");
const awsAccountId = getParameter("AWS_ACCOUNT_ID");
const sqsUri = isOffline
  ? "http://localhost:4576"
  : `https://sqs.${awsRegion}.amazonaws.com`;

const sqsOptions = isOffline
  ? {
      region: awsRegion,
      endpoint: sqsUri
    }
  : {};

export const sqs = new SQS(sqsOptions);

export const queueMessage = async (
  queueUrl: string,
  body: any,
  delaySeconds: number = 0
) => {
  const message: SQS.SendMessageRequest = {
    MessageBody: JSON.stringify(body),
    DelaySeconds: delaySeconds,
    QueueUrl: queueUrl
  };

  const response = await sqs.sendMessage(message).promise();
  return response.MessageId;
};

export const constructQueueUrl = (name: string) => {
  return `${sqsUri}/${isOffline ? "queue" : awsAccountId}/${name}`;
};
