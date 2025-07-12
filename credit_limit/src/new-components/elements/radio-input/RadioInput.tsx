import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { RadioInputProps } from './types';
import RadioInputHookForm from './RadioInputHookForm';
import RadioInputBase from './RadioInputBase';

const RadioInput = forwardRef<HTMLDivElement, RadioInputProps>((props, ref) => {
  const formContext = useFormContext();

  if (formContext)
    return (
      <RadioInputHookForm ref={ref} formContext={formContext} {...props} />
    );

  return <RadioInputBase ref={ref} {...props} />;
});
export default RadioInput;
