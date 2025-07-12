import { forwardRef } from 'react';
import { cx } from '@emotion/css';
import {
  Select as DefaultSelect,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import FieldGroup from '../field-group';

import useSelectMapOptions from './usecase/use-select-map-options';
import useSelectPlaceholder from './usecase/use-select-placeholder';
import { SelectBaseProps } from './types';

const SelectBase = forwardRef<HTMLDivElement, SelectBaseProps>((props, ref) => {
  const {
    name,
    helperText,
    label,
    value,
    className,
    selectClassName,
    options,
    children,
    isInvalid,
    error,
    InputLabelProps,
    placeholder: placeholderText,
    ...resProps
  } = props;

  if (children && options) {
    throw new Error("You can't use children and options at the same time.");
  }

  const { mappedOptions } = useSelectMapOptions({ options });
  const placeholder = useSelectPlaceholder({ placeholder: placeholderText, options });

  return (
    <FieldGroup
      invalid={isInvalid}
      error={error}
      helperText={helperText}
      className={className}
      ref={ref}
      name={name}
    >
      <FormControl>
        <InputLabel  style={{ fontSize: 13 }} {...InputLabelProps}>{label}</InputLabel>
        <DefaultSelect
          {...resProps}
          {...placeholder}
          label={label}
          name={name}
          className={cx(selectClassName)}
          data-filled={Boolean(value)}
          variant='standard'
          error={isInvalid}
          value={value}
        >
          {children ?? mappedOptions}
        </DefaultSelect>
      </FormControl>
    </FieldGroup>
  );
});

export default SelectBase;
