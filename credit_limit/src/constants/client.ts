import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';

import COOKIES_KEY from './cookies';
import { CustomError, blacklistStatusCode } from 'utils/react-query';
/**
 * @TODO workaround issue cannot read properties undefined if import from utils/react-query directly
 *
 * ex. import { fetcherQuery } from utils/react-query; <- this will break
 */
import fetcherQuery from 'utils/react-query/fetcher-query';
import { getCookie, removeCookie } from 'utils/cookie';
import { ApiError } from 'models/api';

const MAX_RETRY = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetcherQuery,
      retry: (failureCount, err) => {
        const error = err as CustomError;
        return failureCount < MAX_RETRY && error.retry;
      },
      enabled: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, err) => {
        const error = err as CustomError;
        return failureCount < MAX_RETRY && error.retry;
      },
    },
  },
});

function redirectOnUnauthenticate() {
  if (typeof window !== 'undefined') {
    const prevSearch = window.location.search.split('?').join('');
    const pathname = window.location.pathname;
    const partner = pathname.split('/')[2];
    const next = pathname;
    const search = `${next ? `?next=${next}` : ''}${
      next ? `${prevSearch ? '&' : ''}${prevSearch}` : window.location.search
    }`;

    window.location.replace(`/merchant/${partner}/login${search}`);
  }
}

export const client = ky.create({
  retry: {
    limit: MAX_RETRY,
    methods: ['get', 'put', 'delete', 'patch'],
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      (req) => {
        const cookies = getCookie() || {};
        const isAuthorizationExist = !!req.headers.get('Authorization');
        const authorization = cookies[COOKIES_KEY.AUTHORIZATION];

        if (authorization && !isAuthorizationExist) {
          req.headers.set('Authorization', authorization);
        }
      },
    ],
    afterResponse: [
      async (_r, _o, res) => {
        if (!res.ok) {
          let errorResponse: Record<string, string> = {};

          if (res.headers.get('content-type') === 'application/json')
            errorResponse = await res.json();

          if (res.status === 401) {
            /**
             * @TODO remove when implement refreshToken
             */
            if (typeof window !== 'undefined') {
              removeCookie(COOKIES_KEY.AUTHORIZATION);
              redirectOnUnauthenticate();
            }
          }

          throw new CustomError(
            `[${res.status}] ${res.statusText}`,
            !blacklistStatusCode.some(
              (statusCode) => statusCode === res.status,
            ),
            {
              ...errorResponse,
              ...(!errorResponse.status_code && {
                statusCode: res.status,
              }),
            },
          );
        }
      },
    ],
    beforeRetry: [
      async ({ error: err }) => {
        const error = err as CustomError<ApiError>;
        const statusCode = error.payload?.statusCode;

        if (statusCode === 401) {
          /**
           * @TODO implement refreshToken
           */
          throw error;
        }

        throw error;
      },
    ],
  },
});
