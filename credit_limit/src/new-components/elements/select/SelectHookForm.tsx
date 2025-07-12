import { cx } from '@emotion/css';
import { forwardRef, useEffect } from 'react';
import { useController } from 'react-hook-form';
import { Select as DefaultSelect, InputLabel } from '@material-ui/core';

import mergeRefs from '@julofinance/web-helpers/dist/fn/mergeRefs';
import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';

import FieldGroup from '../field-group';

import useSelectMapOptions from './usecase/use-select-map-options';
import useSelectPlaceholder from './usecase/use-select-placeholder';
import { SelectHookFormProps } from './types';

const SelectHookForm = forwardRef<HTMLDivElement, SelectHookFormProps>(
  (props, ref) => {
    const {
      formContext,
      name,
      defaultValue,
      required,
      rules,
      helperText,
      label,
      value,
      onChange,
      onBlur,
      className,
      selectClassName,
      selectRef = null,
      options,
      children,
      placeholder: placeholderText,
      ...resProps
    } = props;

    if (children && options) {
      throw new Error("You can't use children and options at the same time.");
    }

    const { control, setValue } = formContext;
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

    const { mappedOptions } = useSelectMapOptions({ options });
    const placeholder = useSelectPlaceholder({ placeholder: placeholderText, options });

    useEffect(() => {
      if (typeof defaultValue !== 'undefined') {
        setValue(name, defaultValue);
      }
      // This only run once
    }, []);

    /**
     * @todo will revert back when using new design
     */
    return (
      <FieldGroup
        invalid={invalid}
        error={error}
        helperText={helperText}
        className={className}
        ref={ref}
        name={name}
      >
        <InputLabel style={{ fontSize: 13 }}>{label}</InputLabel>
        <DefaultSelect
          {...resProps}
          {...placeholder}
          label={label}
          inputRef={mergeRefs(controlRef, selectRef)}
          className={cx(selectClassName)}
          data-filled={Boolean(value ?? controllerValue)}
          variant='outlined'
          error={invalid}
          value={value ?? controllerValue}
          onChange={callAllFn(onChange, controllerOnChange)}
          onBlur={callAllFn(onBlur, controllerOnBlur)}
          {...resFieldProps}
          
        >
          {children ?? mappedOptions}
        </DefaultSelect>
      </FieldGroup>
    );
  },
);

export default SelectHookForm;
