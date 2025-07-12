import type { UseChooseFileOptions } from 'hooks/use-choose-file/types';
import type { ChooseFilePicker } from '../../types';

export type ChooseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ChooseFilePicker &
  UseChooseFileOptions;
