import axios, { AxiosError } from 'axios';
import services from '.';
import utils from '../utils';
import { MethodValueTypes, OptionsTypes } from './types';

const TIMEOUT = 25000; //15 sec
axios.defaults.timeout = TIMEOUT;

const axiosInstance = axios.create();

const interceptorErrorHandling = (err: AxiosError) => {
  if (err.response && err.response.status === 401) {
    // remove token etc
  }
  return Promise.reject(err);
};

// intercept api calls here to log people out if api response 401
// usually happens when token is no longer valid
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (err) {
    return interceptorErrorHandling(err);
  },
);

const POST = async (value: MethodValueTypes, options?: OptionsTypes) => {
  const { url, data, headers } = value;
  const token = utils.store.get('token') || '';
  const authErrorRedirect = options?.authErrorRedirect;
  try {
    const response = await axios.post(url, data, {
      headers: headers,
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;

    services.sentry.handleSentryApiError(error, data, token, {
      authErrorRedirect,
    });
    throw error;
  }
};

const PATCH = async (value: MethodValueTypes, options?: OptionsTypes) => {
  const { url, data, headers } = value;
  const token = utils.store.get('token') || '';
  const authErrorRedirect = options?.authErrorRedirect;

  try {
    const response = await axios.patch(url, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    services.sentry.handleSentryApiError(error as AxiosError, data, token, {
      authErrorRedirect,
    });
    throw error;
  }
};

const PUT = async (value: MethodValueTypes, options?: OptionsTypes) => {
  const { url, data, headers } = value;
  const token = utils.store.get('token') || '';
  const authErrorRedirect = options?.authErrorRedirect;

  try {
    const response = await axios.put(url, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    services.sentry.handleSentryApiError(error as AxiosError, data, token, {
      authErrorRedirect,
    });
    throw error;
  }
};

const GET = async (value: MethodValueTypes, options?: OptionsTypes) => {
  const { url, headers, params } = value;
  const token = utils.store.get('token') || '';
  const authErrorRedirect = options?.authErrorRedirect;

  try {
    const response = await axios.get(url, {
      headers: headers,
      params,
    });
    return response.data;
  } catch (error) {
    services.sentry.handleSentryApiError(error as AxiosError, {}, token, {
      authErrorRedirect,
    });
    throw error;
  }
};

export { POST, PATCH, PUT, GET };
