import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { ProvinceResponse } from '../models';

function useRGetRegencies(
  options: UseQueryOptions<ApiResult<ProvinceResponse>, ApiError> & {
    province?: string;
  } = {},
) {
  const { province, ...resOptions } = options;

  return useQuery<ApiResult<ProvinceResponse>, ApiError>({
    /**
     * @todo rename endpoint to regencies
     */
    queryKey: ['address/cities', { province }],
    ...resOptions,
  });
}

export default useRGetRegencies;
