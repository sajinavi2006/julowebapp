import { UseQueryOptions, useQuery } from 'hooks/react-query';
import { ApiError, ApiResult } from 'models/api';

import { ProfileResponse } from '../models';

function useRGetProfile(
  options: UseQueryOptions<ApiResult<ProfileResponse>, ApiError> = {},
) {
  return useQuery<ApiResult<ProfileResponse>, ApiError>({
    queryKey: ['profile'],
    ...options,
  });
}

export default useRGetProfile;
