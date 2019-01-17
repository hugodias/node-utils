/**
 * @summary: yarn add dotenv aws-sdk winston
 * @requires ./logger
 */
require("dotenv").config();

import aws from "aws-sdk";
import logger from "./logger";

aws.config.update({
  secretAccessKey: process.env.AWS3_ACCESS_KEY_SECRET,
  accessKeyId: process.env.AWS3_ACCESS_KEY_ID,
  region: process.env.AWS3_BUCKET_REGION
});

const s3 = new aws.S3();

/**
 * Upload an image in base64 binary to Amazon S3
 *
 * @note Ensure that you POST a base64 data to this function
 *
 * @param {string} key
 * @param {string} base64
 * @see https://github.com/aws/aws-sdk-js/issues/1712#issuecomment-329331337
 * @returns {Promise}
 */
export async function uploadBase64(key, base64) {
  logger.info(`aws-s3:uploadBase64 invoked for key ${key}`);

  const base64Data = new Buffer(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const fileType = base64.split(";")[0].split("/")[1];
  const filename = `${key}.${fileType}`;

  return new Promise((resolve, reject) => {
    try {
      const data = await s3
        .upload({
          Bucket: process.env.AWS3_BUCKET_NAME,
          Key: filename,
          Body: base64Data,
          ContentEncoding: "base64",
          ContentType: `image/${fileType}`,
          ACL: "public-read"
        })
        .promise();

      logger.info(`aws-s3:uploadBase64 saved: ${data.Location}`);

      resolve({
        url: data.Location,
        key: data.Key
      });
    } catch (err) {
      logger.info(`aws-s3:uploadBase64 error: ${err}`);
      reject(err);
    }
  });
}
