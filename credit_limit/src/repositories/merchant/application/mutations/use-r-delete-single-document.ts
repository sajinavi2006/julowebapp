import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiResult, ApiError } from 'models/api';
import { fetcherMutation } from 'utils/react-query';

import {
  DeleteSingleDocumentResponse,
  DeleteSingleDocumentParam,
} from '../models/mutations';

function useRDeleteSingleDocument(
  options: UseMutationOptions<
    ApiResult<DeleteSingleDocumentResponse>,
    ApiError,
    DeleteSingleDocumentParam
  > = {},
) {
  return useMutation<
    ApiResult<DeleteSingleDocumentResponse>,
    ApiError,
    DeleteSingleDocumentParam
  >({
    ...options,
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: {
          ...context,
          path: `axiata/delete/${variables?.imageId}`,
          method: 'DELETE',
        },
      }),
  });
}

export default useRDeleteSingleDocument;
