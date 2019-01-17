/**
 * @summary: yarn add dotenv es6-promise isomorphic-fetch unsplash-js
 * @requires ./logger
 */
require("dotenv").config();

import "es6-promise";
import "isomorphic-fetch";
import Unsplash, { toJson } from "unsplash-js";
import logger from "./logger";

const unsplash = new Unsplash({
  applicationId: `${process.env.UNSPLASH_ACCESS_KEY}`,
  secret: `${process.env.UNSPLASH_SECRET_KEY}`
});

/**
 * Fetch the latest images from unsplash.
 * Use the params from and to for pagination.
 *
 * @param {number} from
 * @param {number} to
 * @returns {Promise}
 */
export async function latest(from = 2, to = 15) {
  logger.info(`unsplash:latest invoked with range from ${from} to ${to}`);

  return new Promise(async (resolve, reject) => {
    try {
      const photos = await unsplash.photos
        .listPhotos(from, to, "latest")
        .then(toJson);

      resolve(photos);
    } catch (err) {
      reject(err);
    }
  });
}
