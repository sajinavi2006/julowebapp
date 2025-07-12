import { ControllerRenderProps } from 'react-hook-form';

import { InputFilePickerProps } from '../../types';

export interface InputFileSingleProps
  extends Omit<InputFilePickerProps, 'type' | 'filePickerRef' | 'name'> {
  controllerOnChange: ControllerRenderProps['onChange'];
  isError?: boolean;
  type: InputFilePickerProps['type'];
  value: ControllerRenderProps['value'];
}
