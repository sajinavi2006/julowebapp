import { UseMutationOptions, useMutation } from 'hooks/react-query';
import { ApiResult, ApiError } from 'models/api';
import { fetcherMutation } from 'utils/react-query';
import {
  UploadDocumentParam,
  UploadDocumentResponse,
} from '../models/mutations';

function useRUploadDocument(
  options: UseMutationOptions<
    ApiResult<UploadDocumentResponse>,
    ApiError,
    UploadDocumentParam
  > = {},
) {
  return useMutation<
    ApiResult<UploadDocumentResponse>,
    ApiError,
    UploadDocumentParam
  >({
    ...options,
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: 'axiata/upload', isFormData: true },
        variables,
      }),
  });
}

export default useRUploadDocument;
