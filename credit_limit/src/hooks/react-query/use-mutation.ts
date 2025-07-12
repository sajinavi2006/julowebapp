import { useMutation as _useMutation } from '@tanstack/react-query';

import COOKIES_KEY from 'constants/cookies';
import { ApiError } from 'models/api';
import { CustomError, fetcherMutation } from 'utils/react-query';
import useCookie from '../use-cookie';
import { MutationFnArgs, UseMutationOptions } from './types';

/**
 * CURRENTLY THIS HOOKS IS ONLY CAN BE USED IN MERCHANT
 *
 * @TODO Need to readjust the config if services is separated
 */

const useMutation = <
  TData = unknown,
  TError = ApiError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const { mutationFn, ...resOptions } = options;
  const { cookies } = useCookie();

  return _useMutation<
    TData,
    CustomError<TError>,
    MutationFnArgs<TVariables>,
    TContext
  >({
    mutationFn: async ({ context: _context = {}, variables }) => {
      const { meta, ...resContext } = _context;
      const context = {
        path: '',
        meta: {
          ...meta,
          accessToken: cookies[COOKIES_KEY.AUTHORIZATION],
        },
        ...resContext,
      };

      const result: unknown = await (mutationFn
        ? mutationFn({ context, variables })
        : fetcherMutation({ context, variables }));
      return result as TData;
    },
    ...resOptions,
  });
};

export default useMutation;
