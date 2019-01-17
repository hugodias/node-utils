/**
 * @summary: yarn add dotenv @sengrid/client
 * @requires ./logger
 */
require("dotenv").config();

import client from "@sendgrid/client";
import logger from "./logger";

client.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send email to a recipient using dinamic templates.
 *
 * The template ID is a enviorment variable named SENDGRID_TEMPLATE_READY_ID
 *
 * @param {string} name Recipient name
 * @param {string} email Recipient email
 *
 * @see https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md#templates
 * @see https://sendgrid.com/docs/API_Reference/api_v3.html
 *
 * @returns {Promise}
 */
export async function sendMail(name, email) {
  logger.info(`sendgrid:sendMail invoked for name: ${name}, email: ${email}`);

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

  logger.info(`sendgrid:sendMail called with body: ${JSON.stringify(body)}`);

  const request = {
    method: "POST",
    url: "/v3/mail/send",
    body
  };

  return client.request(request);
}
