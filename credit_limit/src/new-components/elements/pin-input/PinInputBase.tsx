import { memo, forwardRef } from 'react';
import OtpInput from 'react-otp-input';

import FieldGroup from '../field-group';

import { PinInputBaseProps } from './types';

import { pinInputCx } from './styles';

const PinInputBase = forwardRef<HTMLInputElement, PinInputBaseProps>(
  (props, ref) => {
    const {
      className,
      error,
      helperText,
      isInvalid,
      label,
      name,
      numInputs,
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
        css={pinInputCx}
        ref={ref}
      >
        <OtpInput
          inputStyle='pin-input'
          className='pin-input-container'
          containerStyle='pin-container'
          errorStyle='pin-input-error'
          hasErrored={isInvalid}
          numInputs={numInputs}
          {...resProps}
        />
      </FieldGroup>
    );
  },
);

export default memo(PinInputBase);
