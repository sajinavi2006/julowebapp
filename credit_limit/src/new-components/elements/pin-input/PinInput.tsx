import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import PinInputBase from './PinInputBase';
import PinInputHookForm from './PinInputHookForm';

import { PinInputProps } from './types';

const PinInput = forwardRef<HTMLInputElement, PinInputProps>((props, ref) => {
  const formContext = useFormContext();

  if (formContext)
    return <PinInputHookForm ref={ref} formContext={formContext} {...props} />;

  return <PinInputBase ref={ref} {...props} />;
});
export default PinInput;
