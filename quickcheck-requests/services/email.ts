import { SES } from "aws-sdk";
import { ses } from "../lib/ses";

export type SendEmailParameters = {
  to: string[];
  from: string;
  body: {
    html: string;
    text: string;
  };
  subject: string;
};

export const EmailService = {
  sendEmail: async (params: SendEmailParameters) => {
    const awsParams: SES.SendEmailRequest = {
      Destination: {
        ToAddresses: params.to
      },
      Message: {
        Body: {
          Html: {
            Data: params.body.html
          },
          Text: {
            Data: params.body.text
          }
        },
        Subject: {
          Data: params.subject
        }
      },
      Source: params.from
    };

    const response = await ses.sendEmail(awsParams).promise();

    return response.MessageId;
  }
};
