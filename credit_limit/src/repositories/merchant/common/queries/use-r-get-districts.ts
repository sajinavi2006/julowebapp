import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { DistrictsResponse } from '../models';

function useRGetDistricts(
  options: UseQueryOptions<ApiResult<DistrictsResponse>, ApiError> & {
    province?: string;
    /**
     * @todo rename to regency
     */
    city?: string;
  } = {},
) {
  const { province, city, ...resOptions } = options;

  return useQuery<ApiResult<DistrictsResponse>, ApiError>({
    queryKey: ['address/districts', { province, city }],
    ...resOptions,
  });
}

export default useRGetDistricts;
