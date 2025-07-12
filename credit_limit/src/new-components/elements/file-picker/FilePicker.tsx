import { cx } from '@emotion/css';
import { forwardRef, memo } from 'react';

import { filePickerCx } from './styles';

import { FilePickerProps } from './types';

import Choose from './components/choose';
import ChooseDragDrop from './components/choose-drag-drop';
import DragDrop from './components/drag-drop';

const FilePicker = forwardRef<HTMLDivElement, FilePickerProps>(
  (props: FilePickerProps, ref) => {
    const { mode = 'choose', className, disabled, ...resProps } = props;

    const classNames = cx('file-picker', className, {
      disabled,
    });

    switch (mode) {
      case 'drag-drop':
        return (
          <DragDrop
            ref={ref}
            data-filepicker-mode={mode}
            data-filepicker-disabled={disabled}
            className={classNames}
            disabled={disabled}
            css={filePickerCx}
            {...resProps}
          />
        );

      case 'choose':
        return (
          <Choose
            ref={ref}
            data-filepicker-mode={mode}
            data-filepicker-disabled={disabled}
            className={classNames}
            disabled={disabled}
            css={filePickerCx}
            {...resProps}
          />
        );

      case 'all':
        return (
          <ChooseDragDrop
            ref={ref}
            data-filepicker-mode={mode}
            data-filepicker-disabled={disabled}
            className={classNames}
            disabled={disabled}
            css={filePickerCx}
            {...resProps}
          />
        );

      default:
        return null;
    }
  },
);

FilePicker.displayName = 'FilePicker';

export default memo(FilePicker);
