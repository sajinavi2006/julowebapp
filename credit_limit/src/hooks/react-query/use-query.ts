import {
  QueryKey,
  useQuery as _useQuery,
  UseQueryOptions,
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

const useQuery = <
  TQueryFnData = unknown,
  TError extends ApiError = ApiError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryKey
  > = {},
) => {
  const { meta, ...resOptions } = options;

  const { cookies } = useCookie();

  return _useQuery<TQueryFnData, CustomError<TError>, TData, TQueryKey>({
    meta: {
      ...meta,
      accessToken: cookies[COOKIES_KEY.AUTHORIZATION],
    },
    ...resOptions,
  });
};

export default useQuery;
