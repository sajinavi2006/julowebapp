import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { cx } from '@emotion/css';
import { callAllFn, mergeRefs } from '@julofinance/web-helpers/dist/fn';

import { CurrencyInputProps } from './types';
import { currencyInputCx } from './styles';
import FieldGroup from '../field-group';
import Input from '../input/InputBase';

const CurrencyInput = forwardRef<HTMLDivElement, CurrencyInputProps>(
  (props, ref) => {
    const {
      onBlur,
      onChange,
      name,
      currency = 'Rp. ',
      className,
      helperText,
      label,
      defaultValue,
      inputRef = null,
      required,
      rules,
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

    return (
      <FieldGroup
        invalid={invalid}
        error={error}
        helperText={helperText}
        className={cx(className, currencyInputCx)}
        label={label}
        ref={ref}
        name={name}
      >
        <div className='currency-input'>
          <Input
            {...resProps}
            ref={ref}
            isInvalid={invalid}
            inputRef={mergeRefs(controlRef, inputRef)}
            className='currency-input-field'
            value={value ?? controllerValue}
            leftElement={
              <div className='currency-input-symbol'>
                <span>{currency}</span>
              </div>
            }
            onChange={callAllFn(onChange, controllerOnChange)}
            onBlur={callAllFn(onBlur, controllerOnBlur)}
            {...resFieldProps}
          />
        </div>
      </FieldGroup>
    );
  },
);

export default CurrencyInput;
