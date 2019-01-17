require('dotenv').config();

import fetch from "node-fetch";
import querystring from "querystring";
import logger from "./logger";

const HUBSPOT_HUB_ID = process.env.HUBSPOT_HUB_ID;
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;

/**
 * Send lead to Hubspot API
 * 
 * @param {object} contact
 * 
 * @see https://developers.hubspot.com/docs/methods/forms/submit_form
 */
export function sendLead(contact) {
  logger.info(
    `hubspot:sendLead invoked for contact: ${JSON.stringify(
      contact
    )}`
  );

  const postData = querystring.stringify({
    email: contact.email,
    firstname: contact.first_name,
    lastname: contact.last_name,
    titlecategory: contact.seniority.name,
    company: contact.organization_name,
    industry: contact.industry.slug,
    numemployees: contact.company_size.term,
    phone: contact.phone
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
  ).catch(error =>
    logger.error(
      `hubspot:sendLead recieved an error sendind contact to hubspot: ${error}`
    )
  );
}
