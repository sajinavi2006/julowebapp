import { forwardRef, memo } from 'react';

import _noop from '@julofinance/web-helpers/dist/fn/noop';
import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';

import useChooseFile from 'hooks/use-choose-file';

import { ChooseProps } from './types';

const Choose = forwardRef<HTMLDivElement, ChooseProps>(
  (props: ChooseProps, ref) => {
    const {
      children,
      onChooseFile,
      multiple,
      disabled,
      onClick,
      accept,
      limitFileSize,
      onErrorLimitFileSize = _noop,
      ...resProps
    } = props;

    const { onOpenFileSelector } = useChooseFile({
      onChooseFile,
      multiple,
      disabled,
      accept,
      limitFileSize,
      onErrorLimitFileSize,
    });

    return (
      <div
        ref={ref}
        onClick={(e) => !disabled && callAllFn(onOpenFileSelector, onClick)(e)}
        {...resProps}
      >
        {children}
      </div>
    );
  },
);

Choose.displayName = 'ChooseFilePicker';

export default memo(Choose);
