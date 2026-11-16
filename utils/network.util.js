/**
 * @param {import('@playwright/test').Page} page
 * @param {string} urlPattern
 * @param {() => Promise<void>} action
 */
async function interceptAndCapture(page, urlPattern, action) {
  const [interceptedRequest] = await Promise.all([
    page.waitForRequest((req) =>
      req.url().includes(urlPattern) && req.method() === 'POST'
    ),
    action()
  ]);

  const requestPayload = interceptedRequest.postDataJSON();
  const response = await interceptedRequest.response();
  const responseBody = await response.json();
  const status = response.status();

  console.log(`\n[${urlPattern}] INTERCEPTED`);
  console.log('Payload:', JSON.stringify(requestPayload, null, 2));
  console.log('Response:', JSON.stringify(responseBody, null, 2));
  console.log('Status:', status);

  return { request: interceptedRequest, requestPayload, responseBody, status };
}

module.exports = { interceptAndCapture };
