require("dotenv").config();

import "es6-promise";
import "isomorphic-fetch";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  applicationId: `${process.env.UNSPLASH_ACCESS_KEY}`,
  secret: `${process.env.UNSPLASH_SECRET_KEY}`
});

/**
 * Fetch the latest images from unsplash.
 * Use the params to choose a range of photos.
 *
 * @param {number} from
 * @param {number} to
 */
export async function latest(from = 2, to = 15) {
  return unsplash.photos.listPhotos(from, to, "latest").then(toJson);
}
