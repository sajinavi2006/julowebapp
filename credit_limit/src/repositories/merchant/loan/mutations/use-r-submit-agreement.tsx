import { useParams } from 'react-router-dom';

import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiError, ApiResult } from 'models/api';
import { fetcherMutation } from 'utils/react-query';

import { LoanAgreementParam } from '../models';

function useRSubmitAgreement(
  options: UseMutationOptions<
    ApiResult<unknown>,
    ApiError,
    LoanAgreementParam
  > = {},
) {
  const { loanXid } = useParams<{ loanXid: string }>();

  return useMutation<ApiResult<unknown>, ApiError, LoanAgreementParam>({
    mutationFn: async ({ context, variables }) => {
      return await fetcherMutation({
        context: { ...context, path: `loan/${loanXid}/skrtp/sign` },
        variables,
      });
    },
    ...options,
  }); 
}

export default useRSubmitAgreement;
