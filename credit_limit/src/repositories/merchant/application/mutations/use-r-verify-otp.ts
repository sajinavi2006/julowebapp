import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiResult, ApiError } from 'models/api';
import { fetcherMutation } from 'utils/react-query';
import { VerifyOtpParam, VerifyOtpResponse } from '../models/mutations';

function useRVerifyOtp(
  options: UseMutationOptions<
    ApiResult<VerifyOtpResponse>,
    ApiError,
    VerifyOtpParam
  > = {},
) {
  return useMutation<ApiResult<VerifyOtpResponse>, ApiError, VerifyOtpParam>({
    ...options,
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'otp/verify' },
        variables,
      }),
  });
}

export default useRVerifyOtp;
