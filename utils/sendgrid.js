require("dotenv").config();

import client from "@sendgrid/client";
import logger from "./logger";
client.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send email to a recipient using dinamic templates
 *
 * @param {string} key
 * @param {string} name
 * @param {string} email
 *
 * @see https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md#templates
 * @see https://sendgrid.com/docs/API_Reference/api_v3.html
 */
export const sendMail = (name, email) => {
  logger.info(`sendgrid:sendReport invoked for name: ${name}, email: ${email}`);

  const body = {
    personalizations: [
      {
        to: [
          {
            email,
            name
          }
        ],
        dynamic_template_data: {
          name
        }
      }
    ],
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME
    },
    template_id: process.env.SENDGRID_TEMPLATE_READY_ID
  };

  logger.info(`sendgrid:sendReport called with body: ${JSON.stringify(body)}`);

  const request = {
    method: "POST",
    url: "/v3/mail/send",
    body
  };

  return client.request(request);
};
