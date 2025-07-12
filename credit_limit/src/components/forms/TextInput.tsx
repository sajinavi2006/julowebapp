import React, { useEffect, useState, useRef } from 'react';
import utils from '../../utils';
import useGlobalState from '../../actions';
import { FormControl } from 'react-bootstrap';

import { Props } from './TextInput/type';

const TextInput: React.FC<Props> = (props) => {
  /** @deprecated use Input component instead */
  const style = { ...props.style };
  const [state, actions] = useGlobalState();
  const [input, setInput] = useState('');
  const [validationStatus, setValidationStatus] = useState<boolean | object>(
    true,
  );
  const formElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.setValue) {
      props.setValue(props.value || '');
    }
    if (props.autofocus && formElement.current) {
      formElement.current.focus();
    }
    if (props.id === 'username') {
      setInput('');
    } else if (
      (!props.allow || props.allow !== 'number') &&
      props.id !== 'pin' &&
      props.id !== 'email-linkaja'
    ) {
      setInput(props.value || state[props.id]);
    }
  }, []);

  const showNotifyBar = (status: boolean, msg: string) => {
    if (props.showNotification && props.showNotification === true) {
      if (status) {
        actions.openNotification(status, msg);
      } else {
        actions.openNotification(status, '');
      }
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (props.handleEnter) {
      if (e.key === 'Enter') {
        props.handleEnter();
      }
    }
  };

  return (
    <FormControl
      readOnly={props?.readOnly}
      ref={formElement}
      id={props.id}
      placeholder={props.placeholder}
      style={style}
      inputMode={props.inputMode}
      value={input}
      maxLength={props.maxLength}
      disabled={props.disabled}
      className={props.className}
      autoComplete='off'
      type={props.type}
      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleEnter(e)}
      onChange={(e) => {
        if (
          props.maxLengthCheck &&
          props.maxLengthCheck === true &&
          props.maxLength
        ) {
          if (e.target.value.length < props.maxLength) {
            actions.setState(props.id + 'Invalid', true);
            actions.setState(props.id + 'ErrorTxt', props.errorMessage);
            showNotifyBar(true, props.errorMessage);
          } else {
            showNotifyBar(false, '');
          }
        }
        if (props.setValue) {
          if (props.allow) {
            if (/^[0-9]*$/.test(e.target.value)) {
              setInput(e.target.value);
              actions.setState(props.id, e.target.value);
              props.setValue(e.target.value);
            }
          } else {
            props.setValue(e.target.value);
          }
        } else {
          if (props.allow) {
            if (/^[0-9]*$/.test(e.target.value)) {
              setInput(e.target.value);
              actions.setState(props.id, e.target.value);
            }
          }
        }
        if (!e.target.value.length) {
          //check if value is empty
          props.validator(false);
        }
      }}
      onInput={(event: React.KeyboardEvent<HTMLInputElement>) => {
        let value = (event.target as HTMLInputElement).value;

        if (props.type === 'number') {
          value = value.replace(/[^\d]/, '');
        }

        if (props?.allow === 'number' && /^[0-9]*$/.test(value)) {
          actions.setState(props.id, value);
        } else if (props?.allow !== 'number') {
          setInput(value);
          actions.setState(props.id, value);
        }

        if (props.saveToLocalStorage) {
          utils.store.set(props.id, value);
        }
        if (value.trim() !== '') {
          if (typeof props.validator === 'function') {
            const validationResult = props.validator(value);

            actions.setState(props.id + 'Invalid', !validationResult);
            showNotifyBar(!validationResult, props.errorMessage);
            setValidationStatus(validationResult);
          } else if (typeof props.validator === 'object') {
            const validationResult = props.validator.test(value);

            actions.setState(props.id + 'Invalid', !validationResult);
            showNotifyBar(!validationResult, props.errorMessage);

            setValidationStatus(validationResult);
          } else if (props.maxLength && value.length > props.maxLength) {
            actions.setState(props.id + 'Invalid', true);
            showNotifyBar(true, props.errorMessage);
            setValidationStatus(false);
          }
        } else {
          actions.setState(props.id + 'Invalid', true);
          showNotifyBar(true, props.errorMessage);
          setValidationStatus(false);
        }
        if (validationStatus === false) {
          actions.setState(props.id + 'ErrorTxt', props.errorMessage);
          showNotifyBar(true, props.errorMessage);
        } else {
          actions.setState(props.id + 'ErrorTxt', '');
          actions.setState(props.id + 'Invalid', false);
          showNotifyBar(false, '');
        }
      }}
    />
  );
};

export default TextInput;
