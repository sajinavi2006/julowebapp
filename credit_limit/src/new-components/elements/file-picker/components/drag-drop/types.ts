import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { UseDragDropOptions } from 'hooks/use-drag-drop';

import { DragDropFilePicker } from '../../types';

export type DragDropProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  DragDropFilePicker &
  Omit<UseDragDropOptions, 'onDrop'>;
