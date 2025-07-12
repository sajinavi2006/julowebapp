import { useHistory, useParams } from 'react-router-dom';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';

import useCookie from 'hooks/use-cookie';
import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiError, ApiResult } from 'models/api';
import { fetcherMutation } from 'utils/react-query';
import COOKIES_KEY from 'constants/cookies';

function useRLogout(
  options: UseMutationOptions<ApiResult<unknown>, ApiError> = {},
) {
  const { onMutate, ...resOptions } = options;

  const { replace } = useHistory();
  const { partnerName } = useParams<{ partnerName: string }>();
  const { removeCookie } = useCookie();

  return useMutation<ApiResult<unknown>, ApiError>({
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'logout' },
        variables,
      }),
    onMutate: callAllFn(() => {
      removeCookie(COOKIES_KEY.AUTHORIZATION);
      replace(`/merchant/${partnerName}/login`);
    }, onMutate),
    ...resOptions,
  });
}

export default useRLogout;
