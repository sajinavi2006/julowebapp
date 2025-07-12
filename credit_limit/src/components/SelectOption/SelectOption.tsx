import React, { useCallback, useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import { cx } from '@emotion/css';
import { Div } from 'assets/css/styled';

import { Option, OptionObject, SelectProps } from './type';

import { Error, SelectOptionContainer, useStyles } from './styles';

const SelectOption: React.FC<SelectProps> = ({
  className,
  disabled,
  errorMessage,
  inputProps,
  label,
  name,
  onChange = () => {},
  placeholder,
  readOnly,
  options = [],
  value,
  renderOptions = _noop,
  renderIcon,
}) => {
  const classes = useStyles();
  const [selectValue, setSelectValue] = useState(value);

  const handleOptionValue = useCallback((option: Option) => {
    if (typeof option === 'object')
      return renderOptions(option as OptionObject) as string;

    return option;
  }, []);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  return (
    <SelectOptionContainer
      error={!!errorMessage}
      className={`select-option-component ${className}`}
    >
      <FormControl className={classes.formControl}>
        <InputLabel shrink={!!selectValue} id={name} style={{ fontSize: 13 }}>
          {label}
        </InputLabel>
        <Select
          error={!!errorMessage}
          labelId={name}
          readOnly={readOnly}
          placeholder={placeholder}
          id={name}
          label={label}
          value={selectValue || ''}
          displayEmpty
          className={cx({
            ['appFormDisabled']: disabled,
            [classes.select]: true,
          })}
          onChange={onChange}
          inputProps={inputProps}
          disabled={disabled}
          renderValue={!renderIcon ? () => selectValue : undefined}
        >
          {options.length > 0 &&
            options.map((option, index) => (
              <MenuItem
                value={handleOptionValue(option)}
                key={index + 'selectoption'}
              >
                <Div display='flex' flexDirection='row' alignItems='center'>
                  {renderIcon && renderIcon(option) && (
                    <img
                      src={renderIcon(option)}
                      style={{ width: '30px', marginRight: '10px' }}
                    />
                  )}

                  {handleOptionValue(option)}
                </Div>
              </MenuItem>
            ))}
        </Select>
        {errorMessage && <Error>{errorMessage}</Error>}
      </FormControl>
    </SelectOptionContainer>
  );
};

export default SelectOption;
