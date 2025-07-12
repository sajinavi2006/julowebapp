import type { UseFormReturn } from 'react-hook-form';
import type { SelectProps as DefaultSelectProps, InputLabelProps } from '@material-ui/core';

import type { FieldBaseProps } from '../types';
import type { FieldGroupProps } from '../field-group';

export interface SelectOption extends Record<string, unknown> {
  value: string | number;
  label: string | number;
}

export interface SelectProps
  extends Omit<
      DefaultSelectProps,
      'name' | 'label' | 'ref' | 'error' | 'variant'
    >,
    FieldBaseProps {
  selectClassName?: string;
  selectRef?: DefaultSelectProps['ref'];
  options?: SelectOption[] | Array<string>;
  defaultValue?: string;
  InputLabelProps?: InputLabelProps;
}

export interface SelectBaseProps
  extends Omit<SelectProps, 'error'>,
    Pick<FieldGroupProps, 'error'> {
      InputLabelProps?: InputLabelProps;
    }

export interface SelectHookFormProps extends SelectProps {
  formContext: UseFormReturn;
}
