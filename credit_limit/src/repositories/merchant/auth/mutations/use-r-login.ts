import { useHistory, useLocation } from 'react-router-dom';

import { callAllFn } from '@julofinance/web-helpers/dist/fn';

import useCookie from 'hooks/use-cookie';
import COOKIES_KEY from 'constants/cookies';
import { useMutation, UseMutationOptions } from 'hooks/react-query';
import { queryParse, queryStringify } from 'utils/url';
import { ApiError, ApiResult } from 'models/api';
import { fetcherMutation } from 'utils/react-query';

import { LoginParam, LoginResponse } from '../models';

function useRLogin(
  options: UseMutationOptions<
    ApiResult<LoginResponse>,
    ApiError,
    LoginParam
  > = {},
) {
  const { onSuccess, ...resOptions } = options;

  const { search } = useLocation();
  const { replace } = useHistory();
  const { setCookie } = useCookie();

  const query = queryParse(search);
  const { next } = query;

  return useMutation<ApiResult<LoginResponse>, ApiError, LoginParam>({
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'login' },
        variables,
      }),
    onSuccess: callAllFn(onSuccess, ({ data }: ApiResult<LoginResponse>) => {
      setCookie(COOKIES_KEY.AUTHORIZATION, `Bearer ${data.accessToken}`, {
        secure: true,
        sameSite: 'strict',
      });

      delete query['next'];

      replace({
        pathname: (next as string) || `/merchant/${data.partner}`,
        search: queryStringify(query),
      });
    }),
    ...resOptions,
  });
}

export default useRLogin;
