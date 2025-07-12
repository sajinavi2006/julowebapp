import { forwardRef } from 'react';
import { TextField } from '@material-ui/core';

import FieldGroup from '../field-group';

import { InputBaseProps } from './types';
import { inputCx } from './styles';

const InputBase = forwardRef<HTMLDivElement, InputBaseProps>((props, ref) => {
  const {
    name,
    helperText,
    className,
    inputClassName,
    type,
    InputLabelProps,
    label,
    isInvalid,
    error,
    InputProps,
    leftElement,
    rightElement,
    showCounter,
    inputProps,
    maxLength,
    currentTextLength,
    labelIndicator,
    ...resProps
  } = props;

  return (
    <FieldGroup
      invalid={isInvalid}
      error={error}
      helperText={helperText}
      className={className}
      ref={ref}
      name={name}
      label={label}
      showCounter={showCounter}
      maxTextLength={maxLength}
      currentTextLength={currentTextLength}
      labelIndicator={labelIndicator}
    >
      <TextField
        {...resProps}
        type={type}
        name={name}
        error={isInvalid}
        css={inputCx}
        className={inputClassName}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: true,
        }}
        inputProps={{
          maxLength,
          ...inputProps,
        }}
        InputProps={{
          startAdornment: leftElement,
          endAdornment: rightElement,
          ...InputProps,
        }}
      />
    </FieldGroup>
  );
});

export default InputBase;
