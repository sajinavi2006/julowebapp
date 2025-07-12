import { forwardRef, memo } from 'react';

import { callAllFn, _noop, mergeRefs } from '@julofinance/web-helpers/dist/fn';

import useChooseFile from 'hooks/use-choose-file';
import useDragDrop from 'hooks/use-drag-drop';

import type { ChooseDragDropProps } from './types';

const ChooseDragDrop = forwardRef<HTMLDivElement, ChooseDragDropProps>(
  (props, ref) => {
    const {
      children,
      onChooseFile,
      onDropFile = _noop,
      disabled,
      onClick,
      onErrorLimitFile = _noop,
      onErrorLimitFileSize = _noop,
      limitFileSize,
      limitFile,
      accept,
      multiple,
      ...resProps
    } = props;

    const { onOpenFileSelector } = useChooseFile({
      onChooseFile,
      limitFileSize,
      onErrorLimitFileSize,
      accept,
      multiple,
    });

    const { dragDropAreaRef } = useDragDrop<HTMLDivElement>({
      limitFile,
      limitFileSize,
      onErrorLimitFile,
      onErrorLimitFileSize,
      onDrop: (files, errors, e) => !disabled && onDropFile(files, errors, e),
    });

    return (
      <div
        ref={mergeRefs(dragDropAreaRef, ref)}
        onClick={(e) => !disabled && callAllFn(onOpenFileSelector, onClick)(e)}
        {...resProps}
      >
        {children}
      </div>
    );
  },
);

ChooseDragDrop.displayName = 'ChooseDragDropFilePicker';

export default memo(ChooseDragDrop);
