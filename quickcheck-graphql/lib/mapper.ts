import DynamoDB = require("aws-sdk/clients/dynamodb");
import { DataMapper } from "@aws/dynamodb-data-mapper";

const localOptions = {
  region: "local",
  endpoint: "http://localhost:8000",
  accessKeyId: "local"
};

console.log(
  "Configuring DynamoDB connection for: " +
    (process.env.IS_OFFLINE ? "OFFLINE" : "ONLINE")
);

export const client = process.env.IS_OFFLINE
  ? new DynamoDB(localOptions)
  : new DynamoDB();

export const mapper = new DataMapper({ client });
