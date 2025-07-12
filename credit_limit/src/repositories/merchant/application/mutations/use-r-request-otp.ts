import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiResult } from 'models/api';
import { fetcherMutation } from 'utils/react-query';

import {
  MetaRequestOtp,
  RequestOtpError,
  RequestOtpParam,
  RequestOtpResponse,
} from '../models/mutations';

function useRRequestOtp(
  options: UseMutationOptions<
    ApiResult<RequestOtpResponse, MetaRequestOtp>,
    RequestOtpError,
    RequestOtpParam
  > = {},
) {
  return useMutation<
    ApiResult<RequestOtpResponse, MetaRequestOtp>,
    RequestOtpError,
    RequestOtpParam
  >({
    ...options,
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'otp/request' },
        variables,
      }),
  });
}

export default useRRequestOtp;
