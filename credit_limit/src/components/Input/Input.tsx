import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from 'react';
import { cx } from '@emotion/css';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import {
  Error,
  InputContainer,
  InputLabel,
  TextField,
  InputField,
  InputAdornment,
  HelperText,
  inputFieldCx,
} from './styles';
import { InputProps } from './types';

const Input = ({
  className,
  classNameInput,
  errorClassName,
  style,
  errorStyle,
  disabled,
  endAdornment,
  errorMessage,
  helperText,
  inputColor,
  inputProps,
  inputPropsMui,
  isNumeric,
  isOutlined,
  label,
  name,
  placeholder,
  preventFocusOnError,
  readOnly,
  startAdornment,
  type = 'text',
  value = '',
  variant,
  onChange = _noop,
  onEnter = _noop,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>();

  /**
   * trimLeft: remove all whitespace before first string
   * replace /\s\s+/g: replace double space with one space
   * replace /[^0-9]/g: replace except number space with one space
   */
  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = (event.target as HTMLInputElement).value;
    const trimmedValue = value.trimLeft().replace(/\s\s+/g, ' ');
    const valueNumeric = trimmedValue.replace(/[^0-9]/g, '');
    const result = isNumeric ? valueNumeric : trimmedValue;

    onChange(result);
    setInputValue(result);
  };

  useEffect(() => {
    if (preventFocusOnError) {
        return;  
    }

    if (errorMessage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [errorMessage, preventFocusOnError]);

  useEffect(() => {
    if (value || value === '') {
      setInputValue(value);
    }
  }, [value]);

  const handleEnter = (
    e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (onEnter) {
      if (e.key === 'Enter') {
        onEnter();
      }
    }
  };

  const onKeyDownValidation = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    return (
      type === 'number' &&
      (event.key === 'e' ||
        event.key === 'E' ||
        event.key === '-' ||
        event.key === '+') &&
      event.preventDefault()
    );
  };

  // Type: text
  const renderTextInput = () => {
    return (
      <TextField
        className={cx(
          {
            ['appFormDisabled']: disabled,
          },
          classNameInput,
        )}
        id={name}
        name={name}
        label={label}
        placeholder={placeholder}
        value={inputValue || ''}
        inputRef={inputRef}
        onChange={handleInputChange}
        disabled={disabled}
        autoComplete='off'
        hiddenLabel
        inputProps={{
          // prevent user input 'e' or 'E' or '-' or '+' if type === number
          onKeyDown: onKeyDownValidation,
          //default maxLength
          maxLength: inputProps?.maxLength ?? 100,
          min: 0,
          style: {
            color: inputColor,
          },
          ...inputProps,
        }}
        InputProps={{
          readOnly: readOnly,
          startAdornment: startAdornment && (
            <InputAdornment position='start'>{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position='end'>{endAdornment}</InputAdornment>
          ),
          ...inputPropsMui,
        }}
        type={type}
        error={!!errorMessage}
        variant={variant}
        fullWidth
      />
    );
  };

  // isOutlined
  const renderOutlinedInput = () => {
    return (
      <InputField
        css={inputFieldCx}
        className={cx(
          {
            ['appFormDisabled']: disabled,
          },
          classNameInput,
        )}
        
        id={name}
        name={name}
        placeholder={label}
        value={inputValue || ''}
        inputRef={inputRef}
        onChange={handleInputChange}
        notched={false}
        disabled={disabled}
        autoComplete='off'
        inputProps={{
          // prevent user input 'e' or 'E' or '-' or '+' if type === number
          onKeyDown: onKeyDownValidation,
          onKeyUp: handleEnter,
          //default maxLength
          maxLength: inputProps?.maxLength ?? 100,
          min: 0,
          style: {
            color: inputColor,
          },
          ...inputProps,
        }}
        readOnly={readOnly}
        startAdornment={
          startAdornment && (
            <InputAdornment position='start'>{startAdornment}</InputAdornment>
          )
        }
        endAdornment={
          endAdornment && (
            <InputAdornment position='end'>{endAdornment}</InputAdornment>
          )
        }
        type={type}
        error={!!errorMessage}
        fullWidth
      />
    );
  };

  // Type: textarea
  const renderTextAreaInput = () => {
    return (
      <div>
        <InputLabel style={{ fontSize: 13 }}>{label}</InputLabel>
        <TextField
          className={cx(
            {
              ['appFormDisabled']: disabled,
            },
            classNameInput,
          )}
          id={name}
          name={name}
          placeholder={placeholder}
          value={inputValue || ''}
          onChange={handleInputChange}
          disabled={disabled}
          inputRef={inputRef}
          autoComplete='off'
          inputProps={{
            style: {
              color: inputColor,
            },
            ...inputProps,
          }}
          InputProps={{
            readOnly: readOnly,
            ...inputPropsMui,
          }}
          error={!!errorMessage}
          multiline
          minRows={8}
          variant='outlined'
          fullWidth
        />
      </div>
    );
  };

  return (
    <InputContainer
      error={!!errorMessage}
      style={style}
      className={cx(className)}
    >
      {isOutlined && renderOutlinedInput()}
      {!isOutlined &&
        (type === 'text' || type === 'number' || type === 'password') &&
        renderTextInput()}
      {type === 'textarea' && renderTextAreaInput()}
      {errorMessage && (
        <Error style={errorStyle} className={cx(errorClassName, 'input-error')}>
          {errorMessage}
        </Error>
      )}
      {!errorMessage && helperText && (
        <HelperText className='helper-text'>{helperText}</HelperText>
      )}
    </InputContainer>
  );
};

export default Input;
