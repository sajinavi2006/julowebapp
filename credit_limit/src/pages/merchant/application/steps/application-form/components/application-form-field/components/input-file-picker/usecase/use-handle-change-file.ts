import humps from 'humps';
import { useCallback } from 'react';
import { UseControllerReturn } from 'react-hook-form';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import { UseFormReturn } from 'hooks/react-hook-form';
import {
  ApplicationFile,
  useRUploadDocument,
} from 'repositories/merchant/application';

import { DocumentType, InputFilePickerProps } from '../types';

interface UseHandleChangeFileOptions {
  limitFile?: number;
  limitFileSize?: number;
  accept?: string[];
  controllerOnChange: UseControllerReturn['field']['onChange'];
  onChangeFile: InputFilePickerProps['onChangeFile'];
  isSingle: InputFilePickerProps['isSingle'];
  name: DocumentType;
  prevFile: ApplicationFile | ApplicationFile[];
  setError: UseFormReturn['setError'];
  clearErrors: UseFormReturn['clearErrors'];
}

function useHandleChangeFile(options: UseHandleChangeFileOptions) {
  const {
    isSingle,
    limitFile,
    limitFileSize,
    controllerOnChange,
    accept,
    onChangeFile: onChangeFileProps = _noop,
    name,
    prevFile,
    setError,
    clearErrors,
  } = options;

  const { isLoading, mutateAsync } = useRUploadDocument({
    onSuccess: (data) => {
      const file = data.data;

      if (Array.isArray(prevFile)) {
        return controllerOnChange([...prevFile, file]);
      }
      controllerOnChange(file);
    },
    onError: (err) => {
      const statusCode = err.payload?.statusCode;
      const errors = err.payload?.errors || {};

      switch (statusCode) {
        case 400:
          return setError(name, {
            type: 'file-validate-error',
            message: errors.file,
          });
        default:
          console.error(err);
      }
    },
  });

  const onChangeFile = useCallback(
    async (files: File[]) => {
      clearErrors(name);

      if (limitFile && files.length > limitFile) {
        return setError(name, {
          type: 'file-validate-error',
          message: `File tidak boleh lebih dari ${limitFile}`,
        });
      }

      const file = files[0];
      const fileSizeInKb = file.size / 1000;

      if (limitFileSize && fileSizeInKb > limitFileSize) {
        return setError(name, {
          type: 'file-validate-error',
          message: `Ukuran file maksimum ${limitFileSize / 1000}MB.`,
        });
      }

      if (accept && !accept.includes(file.type)) {
        return setError(name, {
          message: 'File tidak didukung',
          type: 'http-error',
        });
      }

      if (isSingle) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', humps.decamelize(name));
        try {
          await mutateAsync({
            variables: formData,
          });
        } catch (err) {
          return;
        }
      } else {
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append('file', files[i]);
          formData.append('type', humps.decamelize(name));

          try {
            await mutateAsync({
              variables: formData,
            });
          } catch (err) {
            return;
          }
        }
      }

      onChangeFileProps(files);
    },
    [
      accept,
      controllerOnChange,
      limitFile,
      limitFileSize,
      onChangeFileProps,
      isLoading,
    ],
  );

  return { onChangeFile, isUploadLoading: isLoading };
}

export default useHandleChangeFile;
