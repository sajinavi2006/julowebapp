import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { SubdistrictsResponse } from '../models';

function useRGetSubdistricts(
  options: UseQueryOptions<ApiResult<SubdistrictsResponse>, ApiError> & {
    province?: string;
    /**
     * @todo rename to regency
     */
    city?: string;
    district?: string;
  } = {},
) {
  const { province, city, district, ...resOptions } = options;

  return useQuery<ApiResult<SubdistrictsResponse>, ApiError>({
    queryKey: ['address/subdistricts', { province, city, district }],
    ...resOptions,
  });
}

export default useRGetSubdistricts;
