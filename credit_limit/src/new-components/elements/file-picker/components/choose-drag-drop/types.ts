import { UseChooseFileOptions } from 'hooks/use-choose-file';
import { UseDragDropOptions } from 'hooks/use-drag-drop';

import { AllFilePicker } from '../../types';

export type ChooseDragDropProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AllFilePicker &
  UseChooseFileOptions &
  Omit<UseDragDropOptions, 'onDrop'>;
