import React from 'react';
import OtpInput, { OtpInputProps } from 'react-otp-input';

interface PinProps extends Omit<OtpInputProps, 'isDisabled' | 'inputStyle'> {
  disabled?: boolean;
  style?: Record<string, unknown>;
}

const Pin = (props: PinProps) => {
  const { isInputNum = true, style, disabled, ...resProps } = props;

  return (
    <OtpInput
      {...resProps}
      isDisabled={disabled}
      separator={<span>&nbsp; &nbsp;</span>}
      inputStyle={style}
      isInputNum={isInputNum}
    />
  );
};

export default Pin;
