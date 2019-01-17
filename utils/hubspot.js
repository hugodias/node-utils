/**
 * @summary: yarn add dotenv node-fetch querystring
 * @requires ./logger
 */
require("dotenv").config();

import fetch from "node-fetch";
import querystring from "querystring";
import logger from "./logger";

const HUBSPOT_HUB_ID = process.env.HUBSPOT_HUB_ID;
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;

/**
 * Send a lead to Hubspot
 *
 * @param {object} contact Contact info
 * @see https://developers.hubspot.com/docs/methods/forms/submit_form
 * @returns {Promise}
 */
export async function sendLead(contact) {
  logger.info(
    `hubspot:sendLead invoked for contact: ${JSON.stringify(contact)}`
  );

  // Example of contact structure
  const postData = querystring.stringify({
    email: contact.email,
    firstname: contact.first_name,
    lastname: contact.last_name
  });

  return fetch(
    `https://forms.hubspot.com/uploads/form/v2/${HUBSPOT_HUB_ID}/${HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      body: postData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postData.length
      }
    }
  );
}
