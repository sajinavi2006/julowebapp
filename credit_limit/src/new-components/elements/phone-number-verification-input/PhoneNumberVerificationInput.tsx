import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { callAllFn, mergeRefs } from '@julofinance/web-helpers/dist/fn';

import { CheckCircle } from 'new-components/shapes';

import Input from '../input/InputBase';
import Button from '../button';
import FieldGroup from '../field-group';
import { PhoneNumberVerificationInputProps } from './types';
import { phoneNumberVerificationInputCx } from './styles';
import { useHandleKeyDown } from './usecase';

const PhoneNumberVerificationInput = forwardRef<
  HTMLDivElement,
  PhoneNumberVerificationInputProps
>((props, ref) => {
  const {
    onBlur,
    onChange,
    onKeyDown,
    onVerifyClick,
    buttonDisabled,
    className,
    defaultValue,
    helperText,
    inputRef = null,
    isInvalid = false,
    isVerified = false,
    label,
    name,
    placeholder,
    required,
    rules,
    type,
    value,
    ...resProps
  } = props;

  const { control } = useFormContext();

  const {
    fieldState: { error, invalid },
    field: {
      ref: controlRef,
      onChange: controllerOnChange,
      onBlur: controllerOnBlur,
      value: controllerValue,
      ...resFieldProps
    },
  } = useController({
    name,
    control,
    defaultValue,
    rules: {
      ...(required && { required: 'This field is required' }),
      ...(rules && rules),
    },
  });

  const handleOnKeyDown = useHandleKeyDown();

  return (
    <FieldGroup
      invalid={invalid}
      error={error}
      helperText={helperText}
      className={className}
      css={phoneNumberVerificationInputCx}
      label={label}
      ref={ref}
      name={name}
    >
      <div className='phone-number-verification'>
        <Input
          {...resProps}
          inputProps={{
            'data-is-verified': isVerified,
          }}
          className='phone-number-verification-input'
          isInvalid={invalid || isInvalid}
          ref={ref}
          inputRef={mergeRefs(controlRef, inputRef)}
          type={type}
          placeholder={placeholder}
          value={value ?? controllerValue}
          onChange={callAllFn(onChange, controllerOnChange)}
          onBlur={callAllFn(onBlur, controllerOnBlur)}
          onKeyDown={callAllFn(onKeyDown, handleOnKeyDown)}
          {...resFieldProps}
        />
        <Button
          className='phone-number-verification-button'
          onClick={onVerifyClick}
          disabled={isVerified || buttonDisabled}
          variant={isVerified ? 'secondary' : 'primary'}
        >
          {isVerified ? (
            <>
              <CheckCircle />
              <span>Terverifikasi</span>
            </>
          ) : (
              'Verifikasi'
            )}
        </Button>
      </div>
    </FieldGroup>
  );
});

export default PhoneNumberVerificationInput;
