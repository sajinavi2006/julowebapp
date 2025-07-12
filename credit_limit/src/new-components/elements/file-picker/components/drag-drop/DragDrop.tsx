import { forwardRef, memo } from 'react';

import _noop from '@julofinance/web-helpers/dist/fn/noop';
import mergeRefs from '@julofinance/web-helpers/dist/fn/mergeRefs';

import useDragDrop from 'hooks/use-drag-drop';

import { DragDropProps } from './types';

const DragDrop = forwardRef<HTMLDivElement, DragDropProps>((props, ref) => {
  const {
    children,
    onDropFile,
    disabled,
    onErrorLimitFile = _noop,
    onErrorLimitFileSize = _noop,
    ...resProps
  } = props;

  const { dragDropAreaRef } = useDragDrop<HTMLDivElement>({
    onDrop: onDropFile,
    disabled,
    onErrorLimitFile,
    onErrorLimitFileSize,
  });

  return (
    <div ref={mergeRefs(dragDropAreaRef, ref)} {...resProps}>
      {children}
    </div>
  );
});

DragDrop.displayName = 'DragDropFilePicker';

export default memo(DragDrop);
