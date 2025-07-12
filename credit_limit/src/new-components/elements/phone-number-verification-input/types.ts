import { InputProps } from '../input';
import { FieldBaseProps } from '../types';
export interface PhoneNumberVerificationInputProps
  extends Omit<InputProps, 'variant'>,
    FieldBaseProps {
  buttonDisabled?: boolean;
  isVerified?: boolean;
  onVerifyClick: () => void;
}
