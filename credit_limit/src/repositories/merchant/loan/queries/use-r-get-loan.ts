import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { LoanResponse } from '../models';

function useRGetLoan(
  options: UseQueryOptions<ApiResult<LoanResponse>, ApiError> & {
    loanXid: string;
  },
) {
  const { loanXid, ...resOptions } = options;

  return useQuery<ApiResult<LoanResponse>, ApiError>({
    queryKey: [`loan/${loanXid}`],
    ...resOptions,
  });
}

export default useRGetLoan;
