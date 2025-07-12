import type { UseFormReturn } from 'react-hook-form';
import { OtpInputProps as ReactPinInputProps } from 'react-otp-input';

import { FieldGroupProps } from '../field-group';
import { FieldBaseProps } from '../types';

export interface PinInputProps
  extends Omit<
      ReactPinInputProps,
      'inputStyle' | 'comtainerStyle' | 'errorStyle' | 'hasErrored' | 'onChange'
    >,
    FieldBaseProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface PinInputBaseProps
  extends PinInputProps,
    Pick<FieldGroupProps, 'error'> {}

export interface PinInputHookFormProps extends PinInputProps {
  formContext: UseFormReturn;
}
