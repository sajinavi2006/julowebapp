import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { TextField } from '@material-ui/core';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';
import mergeRefs from '@julofinance/web-helpers/dist/fn/mergeRefs';

import FieldGroup from '../field-group';

import { InputHookFormProps } from './types';
import { inputCx } from './styles';

const InputHookForm = forwardRef<HTMLDivElement, InputHookFormProps>(
  (props, ref) => {
    const {
      formContext,
      name,
      defaultValue,
      required,
      rules,
      helperText,
      value,
      onChange,
      onBlur,
      className,
      inputClassName,
      inputRef = null,
      type,
      InputLabelProps,
      label,
      isInvalid,
      leftElement,
      rightElement,
      InputProps,
      showCounter,
      inputProps,
      maxLength,
      currentTextLength,
      labelIndicator,
      ...resProps
    } = props;

    const { control } = formContext;
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

    return (
      <FieldGroup
        ref={ref}
        invalid={isInvalid || invalid}
        error={error}
        helperText={helperText}
        className={className}
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
          inputRef={mergeRefs(controlRef, inputRef)}
          className={inputClassName}
          css={inputCx}
          error={isInvalid || invalid}
          value={value ?? controllerValue}
          onChange={callAllFn(onChange, controllerOnChange)}
          onBlur={callAllFn(onBlur, controllerOnBlur)}
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
          {...resFieldProps}
        />
      </FieldGroup>
    );
  },
);

export default InputHookForm;
