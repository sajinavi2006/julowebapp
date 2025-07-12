import { useCallback } from 'react';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import type { UseChooseFileOptions } from './types';
import useCheckLimitFileSize from '../use-check-limit-file-size';

const useChooseFile = (options: UseChooseFileOptions = {}) => {
  const {
    onChooseFile = _noop,
    multiple,
    accept,
    limitFileSize,
    onErrorLimitFileSize = _noop,
  } = options;

  const { validateIsExceedLimitFileSize, fileSizeErrors } =
    useCheckLimitFileSize();

  const onOpenFileSelector = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.style.display = 'none';
    if (accept) {
      input.accept = accept.join(',');
    }
    if (multiple) {
      input.multiple = multiple;
    }

    document.body.appendChild(input);

    input.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    input.addEventListener('change', async () => {
      const files = Array.from(input.files ?? []);
      let errors: boolean[] = [];

      if (limitFileSize) {
        errors = validateIsExceedLimitFileSize(files, limitFileSize);
        errors.filter(Boolean).length > 0 && onErrorLimitFileSize(errors);
      }

      onChooseFile(files, errors);
    });

    input.dispatchEvent(new MouseEvent('click'));
    document.body.removeChild(input);
  }, [
    accept,
    limitFileSize,
    multiple,
    onChooseFile,
    onErrorLimitFileSize,
    validateIsExceedLimitFileSize,
  ]);

  return { onOpenFileSelector, fileSizeErrors };
};

export default useChooseFile;
