import { SES } from "aws-sdk";
import { getParameter } from "./params";

const isOffline = getParameter("IS_OFFLINE") == "true";
const sesOptions = isOffline
  ? {
      region: "localhost",
      endpoint: "localhost:4579"
    }
  : {
      region: "us-east-1"
    };

export const ses = new SES(sesOptions);
