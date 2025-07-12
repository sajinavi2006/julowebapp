import { useHistory, useLocation } from 'react-router-dom';
import humps from 'humps';

import { callAllFn } from '@julofinance/web-helpers/dist/fn';

import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiError, ApiResult } from 'models/api';
import { fetcherMutation } from 'utils/react-query';

import { LoanCreationParam, LoanCreationResponse } from '../models';

function useRLoanCreation(
  options: UseMutationOptions<
    ApiResult<LoanCreationResponse>,
    ApiError,
    LoanCreationParam
  > = {},
) {
  const { onSuccess, ...resOptions } = options;

  const { pathname } = useLocation();
  const { replace } = useHistory();

  return useMutation<
    ApiResult<LoanCreationResponse>,
    ApiError,
    LoanCreationParam
  >({
    mutationFn: async ({ context, variables }) => {
      const uploadUrlFormData = new FormData();

      if (variables) {
        Object.entries(variables).forEach(([key, value]) => {
          uploadUrlFormData.append(humps.decamelize(key), value);
        });
      }

      return await fetcherMutation({
        context: { ...context, isFormData: true, path: 'loan/create' },
        variables: uploadUrlFormData,
      });
    },
    onSuccess: callAllFn(
      onSuccess,
      ({ data }: ApiResult<LoanCreationResponse>) => {

        const partner = pathname.split('/')[2];
        
        replace({
          pathname: `/merchant/${partner}/loan/${data.loanXid}`,
        });
      },
    ),
    ...resOptions,
  });
}

export default useRLoanCreation;
