import { ApiError, ApiResult } from 'models/api';

import { UseQueryOptions, useQuery } from 'hooks/react-query';

function useRGetMaxPlatformCheck(
  options: UseQueryOptions<ApiResult<null>, ApiError> = {},
) {
  return useQuery<ApiResult<null>, ApiError>({
    queryKey: ['max-platform-check'],
    ...options,
  });
}

export default useRGetMaxPlatformCheck;
