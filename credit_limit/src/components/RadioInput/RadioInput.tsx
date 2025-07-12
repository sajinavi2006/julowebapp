import React, { useState, useEffect, useRef } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Error, InputLabel, Radio, RadioInputContainer } from './styles';
import { Props } from './type';

const RadioInput: React.FC<Props> = ({
  className,
  disabled,
  errorMessage,
  label,
  name,
  onChange,
  options = [],
  row = true,
  value = '',
}) => {
  const [radioValue, setRadioValue] = useState(value);
  const radioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorMessage && radioRef.current) {
      radioRef.current.scrollIntoView();
    }
  }, [errorMessage]);

  const handleRadioChange = (
    event: React.ChangeEvent<Record<string, never>>,
  ) => {
    const values = event.target.value;
    onChange?.(values, radioValue ? true : false);
    setRadioValue(values);
  };

  useEffect(() => {
    setRadioValue(value);
  }, [value]);

  return (
    <RadioInputContainer
      ref={radioRef}
      className={`radio-input-component ${className}`}
    >
      <InputLabel style={{ fontSize: 14 }}>{label}</InputLabel>
      <RadioGroup id={name} row={row} value={radioValue || ''}>
        {options.length > 0 &&
          options.map((option, i) => (
            <FormControlLabel
              key={i}
              value={option.value}
              control={<Radio color='primary' />}
              label={option.label}
              disabled={disabled}
              onChange={handleRadioChange}
            />
          ))}
      </RadioGroup>
      {errorMessage && <Error>{errorMessage}</Error>}
    </RadioInputContainer>
  );
};

export default RadioInput;
