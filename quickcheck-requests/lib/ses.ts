import { SES } from "aws-sdk";

const sesOptions = process.env.IS_OFFLINE
  ? {
      region: "localhost",
      endpoint: "localhost:4579"
    }
  : {
      region: "us-east-1"
    };

export const ses = new SES(sesOptions);
