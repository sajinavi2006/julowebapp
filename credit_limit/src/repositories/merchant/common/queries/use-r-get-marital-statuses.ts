import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { ProvinceResponse } from '../models';

function useRGetMaritalStatuses(
  options: UseQueryOptions<ApiResult<ProvinceResponse>, ApiError> = {},
) {
  return useQuery<ApiResult<ProvinceResponse>, ApiError>({
    queryKey: ['dropdown/marital-statuses'],
    ...options,
  });
}

export default useRGetMaritalStatuses;
