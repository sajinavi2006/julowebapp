import {
  forwardRef,
  useCallback,
  KeyboardEvent,
  useState,
  ChangeEvent,
} from 'react';
import { useFormContext } from 'react-hook-form';

import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';

import { InputProps } from './types';
import InputBase from './InputBase';
import InputHookForm from './InputHookForm';

const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const { onKeyDown, onChange, currentTextLength, ...resProps } = props;
  const formContext = useFormContext();
  const [currentLength, setCurrentLength] = useState(0);

  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (props.type === 'tel') {
        if (
          e.key.length > 1 ||
          ((e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) &&
            e.key.length <= 1)
        )
          return;
        if (/[^a-zA-Z0-9]/.test(e.key) || /^[a-zA-Z]$/.test(e.key))
          return e.preventDefault();
      }
    },
    [props.type],
  );

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentLength(e.target.value.length);
  }, []);

  if (formContext) {
    return (
      <InputHookForm
        ref={ref}
        onKeyDown={callAllFn(handleOnKeyDown, onKeyDown)}
        onChange={callAllFn(onChange, handleOnChange)}
        formContext={formContext}
        currentTextLength={currentTextLength ?? currentLength}
        {...resProps}
      />
    );
  }

  return (
    <InputBase
      ref={ref}
      onChange={callAllFn(onChange, handleOnChange)}
      currentTextLength={currentTextLength ?? currentLength}
      {...resProps}
    />
  );
});

export default Input;
