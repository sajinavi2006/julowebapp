import { memo, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import OtpInput from 'react-otp-input';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';
import mergeRefs from '@julofinance/web-helpers/dist/fn/mergeRefs';


import FieldGroup from '../field-group';
import { OtpInputHookFormProps } from './types';
import { otpInputCx } from './styles';

const OTPInputHookForm = forwardRef<HTMLInputElement, OtpInputHookFormProps>(
  (props, ref) => {
    const {
      className,
      defaultValue,
      formContext,
      helperText,
      isInvalid,
      label,
      name,
      onChange,
      required,
      rules,
      value,
      ...resProps
    } = props;

    const { control } = formContext;
    const {
      fieldState: { error, invalid },
      field: {
        ref: controlRef,
        onChange: controllerOnChange,
        value: controllerValue,
      },
    } = useController({
      control,
      defaultValue,
      name,
      rules: {
        ...(required && { required: 'This field is required' }),
        ...(rules && rules),
      },
    });

    return (
      <FieldGroup
        className={className}
        error={error}
        helperText={helperText}
        invalid={isInvalid || invalid}
        label={label}
        name={name}
        css={otpInputCx}
        ref={mergeRefs(ref, controlRef)}
      >
        <OtpInput
          inputStyle='otp-input'
          className='otp-input-container'
          containerStyle='otp-container'
          hasErrored={isInvalid || invalid}
          errorStyle='otp-input-error'
          onChange={callAllFn(onChange, controllerOnChange)}
          value={value || controllerValue}
          {...resProps}
        />
      </FieldGroup>
    );
  },
);

export default memo(OTPInputHookForm);
