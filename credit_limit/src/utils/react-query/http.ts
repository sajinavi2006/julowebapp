import humps from 'humps';

import { API_HOST, API_TIMEOUT } from 'constants/config';
import queryStringify from '../url/query-stringify';
import type { HttpOptions } from './model/http';
import customFetch from './custom-fetch';

/**
 * @function timeout
 * @param promise the promise you want to execute
 * @param controller abort controller. This will trigger abort() if past ms
 * @param ms time to timeout in ms
 */
const timeout = <T>(
  promise: Promise<T>,
  controller: AbortController,
  ms: number,
) => {
  const timer = new Promise<never>(() => {
    setTimeout(() => controller.abort(), ms);
  });

  return Promise.race<T>([timer, promise]);
};

/**
 * @function http
 * @param {any} options
 * @param {any} context
 */
const http = async (options: HttpOptions) => {
  const {
    path,
    baseURL,
    params,
    method = 'GET',
    headers = {},
    body,
    accessToken,
  } = options;
  let _http_body: unknown | undefined = undefined;
  let _params = undefined;

  switch (method) {
    case 'DELETE':
    case 'POST':
    case 'PUT':
    case 'PATCH':
      if (headers['Content-Type'] !== 'application/json') {
        _http_body = body;
        break;
      }
      _http_body = body ? JSON.stringify(humps.decamelizeKeys(body)) : '';
      break;
    case 'GET':
      _params = body ? queryStringify(body) : params;
      break;
    default:
      break;
  }

  const base = baseURL || API_HOST;
  const endpoint = base + path;
  const requestPath = endpoint + (_params ? `?${_params}` : '');

  /**
   * Abort controller with polyfill for nodejs & old browser.
   * @see https://github.com/mo/abortcontroller-polyfill#readme
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController#browser_compatibility
   */
  let controller: AbortController;
  if (typeof window === 'undefined') {
    const {
      AbortController: _AbortController,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
    controller = new _AbortController();
  } else {
    controller = new AbortController();
  }

  const request = customFetch(requestPath, {
    method: method,
    body: _http_body as BodyInit,
    signal: controller.signal,
    credentials: 'include',
    headers: {
      ...(accessToken && { Authorization: accessToken }),
      ...headers,
    },
  });

  const response = await timeout<Response>(request, controller, API_TIMEOUT);

  if (!response.headers.get('content-type')?.includes('application/json'))
    return response.blob();

  const json = await response.json();
  /**
   * @dev fransiscus.hermanto@julofinance.com
   * @reason [eslint-disable-next-line @typescript-eslint/no-explicit-any] json can be any type
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return humps.camelizeKeys(json) as any;
};

export default http;
