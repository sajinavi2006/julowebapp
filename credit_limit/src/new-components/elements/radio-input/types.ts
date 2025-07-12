import type { UseFormReturn } from 'react-hook-form';
import type { RadioProps, RadioGroupProps } from '@material-ui/core';

import type { FieldBaseProps } from '../types';
import type { FieldGroupProps } from '../field-group';

export interface RadioInputOptions {
  label: string;
  value: string;
}

export interface RadioInputProps
  extends Omit<RadioGroupProps, 'name' | 'ref'>,
    Omit<FieldBaseProps, 'label'> {
  radioRef?: RadioGroupProps['ref'];
  radioGroupClassName?: string;
  radioClassName?: string;
  defaultValue?: string;
  options: RadioInputOptions[];
  label?: string;
  radioButtonProps?: Omit<RadioProps, 'className'>;
  /**
   * @default column
   */
  flexOrientation?: 'column' | 'row';
  disabled?: boolean;
}

export interface RadioInputBaseProps
  extends Omit<RadioInputProps, 'error'>,
    Pick<FieldGroupProps, 'error'> {}

export interface RadioInputHookFormProps extends RadioInputProps {
  formContext: UseFormReturn;
}
