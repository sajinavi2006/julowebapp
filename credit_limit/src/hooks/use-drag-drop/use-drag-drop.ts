import { useCallback, useEffect, useRef } from 'react';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import useCheckLimitFile from '../use-check-limit-file';
import useCheckLimitFileSize from '../use-check-limit-file-size';
import useMemoArgFunction from '../use-memo-arg-function';

import { UseDragDropOptions } from './types';

const useDragDrop = <TDragDropElement extends HTMLElement = HTMLDivElement>(
  options: UseDragDropOptions = {},
) => {
  const {
    onDrop: _onDropOption = _noop,
    limitFile,
    limitFileSize,
    onErrorLimitFile = _noop,
    onErrorLimitFileSize = _noop,
  } = options;

  const ref = useRef<TDragDropElement>(null);
  const onDropOption = useMemoArgFunction(_onDropOption);

  const { validateIsExceedLimitFile, isErrorExceedLimitFile } =
    useCheckLimitFile();
  const { validateIsExceedLimitFileSize, fileSizeErrors } =
    useCheckLimitFileSize();

  const handleDrop = useCallback(
    (
        cb: (
          files: File[],
          items: DataTransferItem[],
          errors: boolean[],
          isExceedLimitFile: boolean,
          e: DragEvent,
        ) => void,
      ) =>
      (e: DragEvent) => {
        e.preventDefault();
        let errors: boolean[] = [];
        let isExceedLimitFile = false;

        if (!e.dataTransfer) return;

        const dataTransferItems = [...e.dataTransfer.items];
        const dataTransferFiles = [...e.dataTransfer.files];

        if (limitFile) {
          isExceedLimitFile = validateIsExceedLimitFile(
            e.dataTransfer.items.length,
            limitFile,
          );
        }

        if (limitFileSize) {
          errors = validateIsExceedLimitFileSize(
            dataTransferFiles,
            limitFileSize,
          );
        }

        cb(dataTransferFiles, dataTransferItems, errors, isExceedLimitFile, e);
      },
    [
      limitFile,
      limitFileSize,
      validateIsExceedLimitFile,
      validateIsExceedLimitFileSize,
    ],
  );

  useEffect(() => {
    if (!ref.current) return;

    const target = ref.current;

    function handleDragOver(e: DragEvent) {
      e.preventDefault();
    }

    target.addEventListener('dragover', handleDragOver);

    function onDrop(
      files: File[],
      items: DataTransferItem[],
      errors: boolean[],
      _: boolean,
      e: DragEvent,
    ) {
      items.forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile() as File;

          if (files.some((curFile) => curFile.name === file.name)) return;

          files.push(file);
        }
      });

      onDropOption.current(files, errors, e);
    }

    target.addEventListener('drop', handleDrop(onDrop));
  }, [handleDrop, onDropOption]);

  useEffect(() => {
    if (!ref.current) return;

    const target = ref.current;

    function onErrorDrop(
      _: File[],
      _i: DataTransferItem[],
      errors: boolean[],
      isExceedLimitFile: boolean,
    ) {
      errors.filter(Boolean).length > 0 && onErrorLimitFileSize(errors);
      isExceedLimitFile && onErrorLimitFile(isExceedLimitFile);
    }

    target.addEventListener('drop', handleDrop(onErrorDrop));
  }, [handleDrop, onErrorLimitFile, onErrorLimitFileSize]);

  return {
    dragDropAreaRef: ref,
    isErrorExceedLimitFile,
    fileSizeErrors,
  };
};

export default useDragDrop;
