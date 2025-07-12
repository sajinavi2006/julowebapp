import { forwardRef } from 'react';
import { useController } from 'react-hook-form';

import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';
import mergeRefs from '@julofinance/web-helpers/dist/fn/mergeRefs';

import FieldGroup from '../field-group';

import { RadioInputHookFormProps } from './types';
import { radioGroupCx } from './styles';

const RadioInputHookForm = forwardRef<HTMLDivElement, RadioInputHookFormProps>(
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
      radioClassName,
      radioRef = null,
      options,
      label,
      radioGroupClassName,
      radioButtonProps,
      flexOrientation = 'column',
      disabled,
      isInvalid,
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
        invalid={isInvalid || invalid}
        error={error}
        helperText={helperText}
        className={className}
        ref={ref}
        name={name}
        label={label}
      >
        <RadioGroup
          {...resProps}
          ref={mergeRefs(radioRef, controlRef)}
          className={radioGroupClassName}
          css={radioGroupCx(flexOrientation)}
          value={value ?? controllerValue}
          onChange={callAllFn(onChange, controllerOnChange)}
          onBlur={callAllFn(onBlur, controllerOnBlur)}
          {...resFieldProps}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              className={radioClassName}
              control={<Radio disabled={disabled} {...radioButtonProps} />}
              {...option}
            />
          ))}
        </RadioGroup>
      </FieldGroup>
    );
  },
);

export default RadioInputHookForm;
