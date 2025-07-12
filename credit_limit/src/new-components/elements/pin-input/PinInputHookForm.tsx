import { memo, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import OtpInput from 'react-otp-input';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';
import mergeRefs from '@julofinance/web-helpers/dist/fn/mergeRefs';

import FieldGroup from '../field-group';

import { PinInputHookFormProps } from './types';

import { pinInputCx } from './styles';

const PinInputHookForm = forwardRef<HTMLInputElement, PinInputHookFormProps>(
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
      numInputs,
      value,
      ...resProps
    } = props;

    const { control } = formContext;
    const {
      fieldState: { error: pinError, invalid: pinInvalid },
      field: {
        ref: pinControlRef,
        onChange: pinControllerOnChange,
        value: pinControllerValue,
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
        error={pinError}
        helperText={helperText}
        invalid={isInvalid || pinInvalid}
        label={label}
        name={name}
        css={pinInputCx}
        ref={mergeRefs(ref, pinControlRef)}
      >
        <OtpInput
          inputStyle='pin-input'
          className='pin-input-container'
          containerStyle='pin-container'
          hasErrored={isInvalid || pinInvalid}
          errorStyle='pin-input-error'
          onChange={callAllFn(onChange, pinControllerOnChange)}
          value={value || pinControllerValue}
          numInputs={numInputs}
          {...resProps}
        />
      </FieldGroup>
    );
  },
);

export default memo(PinInputHookForm);
