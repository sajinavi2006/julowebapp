import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiResult, ApiError } from 'models/api';
import { fetcherMutation } from 'utils/react-query';

import { DeleteDocumentResponse } from '../models';

function useRDeleteDocuments(
  options: UseMutationOptions<ApiResult<DeleteDocumentResponse>, ApiError> = {},
) {
  return useMutation<ApiResult<DeleteDocumentResponse>, ApiError>({
    ...options,
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'axiata/delete', method: 'DELETE' },
        variables,
      }),
  });
}

export default useRDeleteDocuments;
