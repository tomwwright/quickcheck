import { SQS } from "aws-sdk";

import { getParameter } from "./params";

const awsRegion = getParameter("AWS_REGION");
const awsAccountId = getParameter("AWS_ACCOUNT_ID");
const sqsUri = process.env.IS_OFFLINE
  ? "http://localhost:4576"
  : `https://sqs.${awsRegion}.amazonaws.com`;

const sqsOptions = process.env.IS_OFFLINE
  ? {
      region: awsRegion,
      endpoint: sqsUri
    }
  : {};

export const sqs = new SQS(sqsOptions);

export const queueMessage = async (queueUrl: string, body: any) => {
  const message: SQS.SendMessageRequest = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueUrl
  };

  const response = await sqs.sendMessage(message).promise();
  return response.MessageId;
};

export const constructQueueUrl = (name: string) => {
  return `${sqsUri}/${process.env.IS_OFFLINE ? "queue" : awsAccountId}/${name}`;
};
