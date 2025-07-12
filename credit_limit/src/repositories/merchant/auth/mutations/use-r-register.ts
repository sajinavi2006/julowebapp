import { useHistory, useLocation } from 'react-router-dom';

import { callAllFn } from '@julofinance/web-helpers/dist/fn';

import useCookie from 'hooks/use-cookie';
import COOKIES_KEY from 'constants/cookies';
import { queryParse, queryStringify } from 'utils/url';
import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiError, ApiResult } from 'models/api';
import { fetcherMutation } from 'utils/react-query';

import { RegisterParam, RegisterResponse } from '../models';

function useRRegister(
  options: UseMutationOptions<
    ApiResult<RegisterResponse>,
    ApiError,
    RegisterParam
  > = {},
) {
  const { onSuccess, ...resOptions } = options;

  const { search } = useLocation();
  const { replace } = useHistory();
  const { setCookie } = useCookie();

  const query = queryParse(search);
  const { next } = query;

  return useMutation<ApiResult<RegisterResponse>, ApiError, RegisterParam>({
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'axiata/register' },
        variables,
      }),
    onSuccess: callAllFn(onSuccess, ({ data }: ApiResult<RegisterResponse>) => {
      setCookie(COOKIES_KEY.AUTHORIZATION, `Bearer ${data.accessToken}`, {
        secure: true,
        sameSite: 'strict',
      });

      delete query['next'];

      replace({
        pathname: (next as string) || `/merchant/${data.partner}/application`,
        search: queryStringify(query),
      });
    }),
    ...resOptions,
  });
}

export default useRRegister;
