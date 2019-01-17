# Node Utils

## List of utility functions for NodeJS

### Services Available

#### Files

- [Upload a Base64 image to AWS S3](./utils/aws-s3.js)

#### Marketing tools

- [Create a lead on Hubspot](./utils/hubspot.js)
- [Send an email using dinamic templates on Sendgrid](./utils/sendgrid.js)

#### Consume api's

- [Fetch images from unsplash](./utils/unsplash.js)

---

## Contributing

#### **Do you intend to add a new function or change an existing one?**

- **Ensure a pull request with this feature was not already opened** by searching on GitHub under [Pull Requests](https://github.com/hugodias/node-utils/pull-requests).

* Make sure your role meets the following requirements:
  - At the first line it **MUST** have a comment declaring the dependencies
  - The function **MUST** run asynchronously
  - The function **MUST** return a Promise
  - The function **MUST** have a JSDoc comment with its parameters

Example

```js
/**
 * @summary: yarn add node-fetch
 * @requires ./logger
 */
import fetch from "node-fetch";
import logger from "./logger";

/**
 * Do a GET request
 *
 * @param {string} url
 * @returns {Promise}
 */
export async function requestFunc(url) {
  logger.info(`example:requestFunc invoked`);

  return new Promise((resolve, reject) => {
    try {
      const response = await fetch(url);
      // Do something here ...
      resolve(response);
    } catch (err) {
      logger.info(`example:requestFunc - Error: woops`);
      reject(err);
    }
  });
}
```

- Open a new Github pull request with the suggestion.

## How to contribute to Node Utils

#### **Did you find a bug?**

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/hugodias/node-utils/issues).

- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/hugodias/node-utils/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

#### **Did you write a patch that fixes a bug?**

- Open a new GitHub pull request with the patch.

- Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

Thanks! :heart: :heart: :heart:
