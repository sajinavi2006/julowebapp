import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import type { UseChooseFileOptions } from 'hooks/use-choose-file';
import type { UseDragDropOptions } from 'hooks/use-drag-drop';

export type FilePickerMode = 'drag-drop' | 'choose' | 'all';

export type FilePickerProps = (
  | DragDropFilePicker
  | ChooseFilePicker
  | AllFilePicker
) &
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
  > & {
    /**
     * @default choose
     */
    mode?: FilePickerMode;
  };

export interface DragDropFilePicker {
  mode?: 'drag-drop';
  onDropFile?: UseDragDropOptions['onDrop'];
  limitFile?: UseDragDropOptions['limitFile'];
  disabled?: boolean;
  onErrorLimitFileSize?: (errors: boolean[]) => void;
  onErrorLimitFile?: (isExceedLimitFile: boolean) => void;
}

export interface ChooseFilePicker extends UseChooseFileOptions {
  mode?: 'choose';
  disabled?: boolean;
  onErrorLimitFileSize?: (errors: boolean[]) => void;
}

export interface AllFilePicker
  extends Omit<ChooseFilePicker, 'mode'>,
    Omit<DragDropFilePicker, 'mode'> {
  mode?: 'all';
  disabled?: boolean;
}
