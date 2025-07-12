import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { LoansMeta, LoansResponse } from '../models';

function useRGetLoans(
  options: UseQueryOptions<ApiResult<LoansResponse[], LoansMeta>, ApiError> & {
    loanStatus?: string;
    limit?: number;
    page?: number;
  } = {},
) {
  const { loanStatus, limit, page, ...resOptions } = options;

  return useQuery<ApiResult<LoansResponse[], LoansMeta>, ApiError>({
    queryKey: ['loan', { loan_status: loanStatus, limit, page }],
    ...resOptions,
  });
}

export default useRGetLoans;
