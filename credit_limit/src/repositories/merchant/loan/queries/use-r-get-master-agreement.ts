import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { MasterAgreementResponse } from '../models';

function useRGetMasterAgreement(
  options: UseQueryOptions<ApiResult<MasterAgreementResponse>, ApiError> & {
    loanXid: string;
  },
) {
  const { loanXid, ...resOptions } = options;

  return useQuery<ApiResult<MasterAgreementResponse>, ApiError>({
    queryKey: [`loan/${loanXid}/skrtp`],
    ...resOptions,
  });
}

export default useRGetMasterAgreement;
