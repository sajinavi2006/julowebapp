import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiResult, ApiError } from 'models/api';
import { fetcherMutation } from 'utils/react-query';
import { SubmitApplicationParam } from '../models/mutations';

function useRSubmitApplication(
  options: UseMutationOptions<
    ApiResult<SubmitApplicationParam>,
    ApiError,
    SubmitApplicationParam
  > = {},
) {
  return useMutation<
    ApiResult<SubmitApplicationParam>,
    ApiError,
    SubmitApplicationParam
  >({
    ...options,
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'axiata/submit' },
        variables,
      }),
  });
}

export default useRSubmitApplication;
