const BASE_HEADERS = {
  accept: 'application/json, text/plain, */*',
  'content-type': 'application/json',
  ...(process.env.BASE_URL ? { origin: process.env.BASE_URL } : {}),
  ...(process.env.BASE_URL ? { referer: process.env.BASE_URL } : {}),
};

const LOGIN_TIMEOUT_MS = 60000;
const API_TIMEOUT_MS = 30000;

class ApiClient {
  static cachedToken = null;

  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.apiBase = process.env.API_BASE_URL;
    this.token = ApiClient.cachedToken || '';
  }

  async login(force = false) {
    if (!force && ApiClient.cachedToken) {
      this.token = ApiClient.cachedToken;
      return this.token;
    }

    const res = await this.request.post(process.env.SSO_LOGIN_URL, {
      headers: BASE_HEADERS,
      timeout: LOGIN_TIMEOUT_MS,
      data: {
        username: process.env.SSO_USERNAME,
        password: process.env.SSO_PASSWORD,
        companyToken: process.env.SSO_COMPANY_TOKEN,
      },
    });

    const body = await res.json();

    const token =
      body?.token ??
      body?.data?.token ??
      body?.accessToken ??
      body?.data?.accessToken;

    if (!token) throw new Error('Token not found');

    this.token = token;
    ApiClient.cachedToken = token;
    return token;
  }

  /**
   * @param {string} path
   * @param {Record<string, unknown>} payload
   */
  async post(path, payload) {
    const url = `${this.apiBase}${path}`;

    console.log('API:', url);

    const res = await this.request.post(url, {
      headers: {
        ...BASE_HEADERS,
        authorization: `Bearer ${this.token}`,
      },
      timeout: API_TIMEOUT_MS,
      data: payload,
    });

    if (res.status() !== 200) {
      console.error('API FAILED:', url);
      console.error('Status:', res.status());
      console.error('Response:', await res.text());
    }

    return res;
  }

  /**
   * @param {string} path
   * @param {Record<string, string>} [extraHeaders]  Additional headers
   *   merged on top of the defaults — e.g. some workflow_engine routes
   *   require a custom `auth-head` header in addition to the Bearer token.
   */
  async get(path, extraHeaders = {}) {
    const url = `${this.apiBase}${path}`;

    console.log('API:', url);

    const res = await this.request.get(url, {
      headers: {
        ...BASE_HEADERS,
        authorization: `Bearer ${this.token}`,
        ...extraHeaders,
      },
      timeout: API_TIMEOUT_MS,
    });

    if (res.status() !== 200) {
      console.error('API FAILED:', url);
      console.error('Status:', res.status());
      console.error('Response:', await res.text());
    }

    return res;
  }

  /**
   * Like post(), but takes a full absolute URL instead of a path relative
   * to apiBase. Needed for endpoints that live outside /pnmv2/api
   * (e.g. /backend/sso/..., /backend/store/..., /backend/hrms/...).
   *
   * @param {string} url
   * @param {Record<string, unknown>} payload
   */
  async postAbsolute(url, payload) {
    console.log('API:', url);

    const res = await this.request.post(url, {
      headers: {
        ...BASE_HEADERS,
        authorization: `Bearer ${this.token}`,
      },
      timeout: API_TIMEOUT_MS,
      data: payload,
    });

    if (res.status() !== 200) {
      console.error('API FAILED:', url);
      console.error('Status:', res.status());
      console.error('Response:', await res.text());
    }

    return res;
  }

  /**
   * Like get(), but takes a full absolute URL instead of a path relative
   * to apiBase.
   *
   * @param {string} url
   */
  async getAbsolute(url) {
    console.log('API:', url);

    const res = await this.request.get(url, {
      headers: {
        ...BASE_HEADERS,
        authorization: `Bearer ${this.token}`,
      },
      timeout: API_TIMEOUT_MS,
    });

    if (res.status() !== 200) {
      console.error('API FAILED:', url);
      console.error('Status:', res.status());
      console.error('Response:', await res.text());
    }

    return res;
  }

  static extractList(body) {
    if (Array.isArray(body?.data?.data)) return body.data.data;
    if (Array.isArray(body?.data)) return body.data;
    if (Array.isArray(body)) return body;
    return [];
  }
}

module.exports = { ApiClient };