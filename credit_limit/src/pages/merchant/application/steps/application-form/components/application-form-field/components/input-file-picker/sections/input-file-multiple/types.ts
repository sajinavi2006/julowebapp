import { ControllerRenderProps } from 'react-hook-form';

import { InputFilePickerProps } from '../../types';

export interface InputFileMultipleProps
  extends Omit<InputFilePickerProps, 'name' | 'type' | 'filePickerRef'> {
  controllerOnChange: ControllerRenderProps['onChange'];
  value: ControllerRenderProps['value'];
  type: InputFilePickerProps['type'];
  isError: boolean;
}
