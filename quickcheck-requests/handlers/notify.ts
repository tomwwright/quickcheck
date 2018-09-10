import { SQSHandler, Context } from "aws-lambda";

import { SendEmailParameters, EmailService } from "../services/email";

export type EmailNotification = {
  type: "email";
  to: string[];
  checkName: string;
  datetime: string;
};

export const NotifyHandler: SQSHandler = async (event, context) => {
  const notification: EmailNotification = JSON.parse(event.Records[0].body);

  const email: SendEmailParameters = {
    to: notification.to,
    from: "tom.suffern.wright@gmail.com",
    subject: `QuickCheck: ${notification.checkName} has failed!`,
    body: {
      html: `
        <h1>Failed check on QuickCheck!</h1>
        
        <p><b>Check Name</b>: ${notification.checkName}</p>
        <p><b>Check Failure Time</b>: ${Date.parse(
          notification.datetime
        ).toLocaleString()}</p>

        Regards,
        QuickCheck Team
        `,
      text: `
        Failed check on Quickcheck!
        ---------------------------
        
        Check Name: ${notification.checkName}
        Check Failure Time: ${Date.parse(
          notification.datetime
        ).toLocaleString()}
        
        Regards,
        QuickCheck Team`
    }
  };

  const messageId = await EmailService.sendEmail(email);

  console.log("Successfully sent email with Message ID: " + messageId);
};
