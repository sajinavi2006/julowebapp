import { memo, forwardRef } from 'react';
import OtpInput from 'react-otp-input';

import FieldGroup from '../field-group';
import { OtpInputBaseProps } from './types';
import { otpInputCx } from './styles';

const OTPInputBase = forwardRef<HTMLInputElement, OtpInputBaseProps>(
  (props, ref) => {
    const {
      className,
      error,
      helperText,
      isInvalid,
      label,
      name,
      ...resProps
    } = props;

    return (
      <FieldGroup
        className={className}
        error={error}
        helperText={helperText}
        invalid={isInvalid}
        label={label}
        name={name}
        css={otpInputCx}
        ref={ref}
      >
        <OtpInput
          inputStyle='otp-input'
          className='otp-input-container'
          containerStyle='otp-container'
          errorStyle='otp-input-error'
          hasErrored={isInvalid}
          {...resProps}
        />
      </FieldGroup>
    );
  },
);

export default memo(OTPInputBase);
