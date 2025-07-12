import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { ProvinceResponse } from '../models';

function useRGetProvinces(
  options: UseQueryOptions<ApiResult<ProvinceResponse>, ApiError> = {},
) {
  return useQuery<ApiResult<ProvinceResponse>, ApiError>({
    queryKey: ['address/provinces'],
    ...options,
  });
}

export default useRGetProvinces;
