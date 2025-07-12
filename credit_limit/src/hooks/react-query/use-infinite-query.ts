import {
  QueryKey,
  useInfiniteQuery as _useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import COOKIES_KEY from 'constants/cookies';
import { ApiError } from 'models/api';
import { CustomError } from 'utils/react-query';
import useCookie from '../use-cookie';

/**
 * CURRENTLY THIS HOOKS IS ONLY CAN BE USED IN MERCHANT
 *
 * @TODO Need to readjust the config if services is separated
 */

const useInfiniteQuery = <
  TQueryFnData = unknown,
  TError extends ApiError = ApiError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryFnData,
    TQueryKey
  > = {},
) => {
  const { meta, ...resOptions } = options;
  const { cookies } = useCookie();

  return _useInfiniteQuery<TQueryFnData, CustomError<TError>, TData, TQueryKey>(
    {
      meta: {
        ...meta,
        accessToken: cookies[COOKIES_KEY.AUTHORIZATION],
      },
      ...resOptions,
    },
  );
};

export default useInfiniteQuery;
