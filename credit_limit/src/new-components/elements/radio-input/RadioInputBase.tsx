import { cx } from '@emotion/css';
import { forwardRef } from 'react';

import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import FieldGroup from '../field-group';

import { RadioInputBaseProps } from './types';
import { radioGroupCx } from './styles';

const RadioInputBase = forwardRef<HTMLDivElement, RadioInputBaseProps>(
  (props, ref) => {
    const {
      name,
      helperText,
      className,
      radioClassName,
      options,
      label,
      radioGroupClassName,
      radioButtonProps,
      flexOrientation = 'column',
      disabled,
      error,
      isInvalid,
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
      >
        <RadioGroup
          {...resProps}
          className={cx(radioGroupClassName, radioGroupCx(flexOrientation))}
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

export default RadioInputBase;
