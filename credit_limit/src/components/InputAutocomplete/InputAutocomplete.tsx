import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import { cx } from '@emotion/css';

import { InputAutocompleteContainer, Error, useStyles } from './styles';
import { Props } from './type';

const filterOptions = createFilterOptions({
  limit: 100,
});
const InputAutocomplete: React.FC<Props> = ({
  allowInput = true,
  className,
  disabled,
  errorMessage,
  inputProps,
  label,
  readOnly,
  name,
  onChange,
  options = [],
  onSelect,
  value,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>();

  const handleOnChangeInput = (value: string, type: string) => {
    if (type === 'input') {
      const currentValue = value;
      setInputValue(currentValue);
      if (allowInput && onChange) {
        onChange(currentValue);
      }
    }
  };

  const handleOnChange = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
    const currentValue = value;
    if (onChange) onChange(currentValue);
    setInputValue(currentValue);
  };

  useEffect(() => {
    if (errorMessage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [errorMessage]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleOnBlur = () => {
    if (!allowInput) {
      const isInclude = options.includes(value);
      if (!isInclude || value !== inputValue) {
        if (onChange) onChange('');
        setInputValue('');
      }
    }
  };

  return (
    <InputAutocompleteContainer
      className={`input-autocomplete-component ${className}`}
    >
      <Autocomplete
        onBlur={handleOnBlur}
        ref={inputRef}
        id={name}
        clearOnEscape={true}
        noOptionsText='Tidak ada data'
        disabled={disabled}
        filterOptions={filterOptions}
        inputValue={inputValue || ''}
        freeSolo={true}
        options={options}
        getOptionLabel={(option) => option}
        onChange={(el, value: string) => handleOnChange(value)}
        onInputChange={(el, val, type) => handleOnChangeInput(val, type)}
        renderInput={(params) => (
          <TextField
            {...params}
            className={cx(classes.root, {
              ['appFormDisabled']: disabled,
            })}
            InputProps={{
              ...params.InputProps,
              readOnly: readOnly,
              endAdornment: (
                <InputAdornment position='end'>{''}</InputAdornment>
              ),
              ...inputProps,
            }}
            disabled={disabled}
            error={!!errorMessage}
            label={label}
          />
        )}
      />
      {errorMessage && <Error>{errorMessage}</Error>}
    </InputAutocompleteContainer>
  );
};

export default InputAutocomplete;
