import { OtpInputProps as ReactOtpInputProps } from 'react-otp-input';

import { UseFormReturn } from 'hooks/react-hook-form';

import { FieldGroupProps } from '../field-group';
import { FieldBaseProps } from '../types';

export interface OtpInputProps
  extends Omit<
      ReactOtpInputProps,
      'inputStyle' | 'comtainerStyle' | 'errorStyle' | 'hasErrored' | 'onChange'
    >,
    FieldBaseProps {
  defaultValue?: string;
  onChange?: ReactOtpInputProps['onChange'];
}

export interface OtpInputBaseProps
  extends OtpInputProps,
    Pick<FieldGroupProps, 'error'> {}

export interface OtpInputHookFormProps extends OtpInputProps {
  formContext: UseFormReturn;
}
