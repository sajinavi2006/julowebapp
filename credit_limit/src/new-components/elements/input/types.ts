import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import type {
  InputLabelProps,
  StandardTextFieldProps,
} from '@material-ui/core';

import type { FieldBaseProps } from '../types';
import { FieldGroupProps } from '../field-group';

export interface InputProps
  extends Omit<
      StandardTextFieldProps,
      'helperText' | 'name' | 'label' | 'error' | 'variant'
    >,
    FieldBaseProps,
    Pick<FieldGroupProps, 'labelIndicator'> {
  defaultValue?: string;
  inputClassName?: string;
  InputLabelProps?: Omit<InputLabelProps, 'shrink'>;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  showCounter?: boolean;
  maxLength?: number;
  /**
   * If not define value will be collected from input value
   */
  currentTextLength?: number;
}

export interface InputBaseProps
  extends Omit<InputProps, 'error'>,
    Pick<FieldGroupProps, 'error'> {}

export interface InputHookFormProps extends InputProps {
  formContext: UseFormReturn;
}
