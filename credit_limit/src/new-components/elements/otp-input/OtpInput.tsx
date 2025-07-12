import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import OtpInputBase from './OtpInputBase';
import OtpInputHookForm from './OtpInputHookForm';
import { OtpInputProps } from './types';

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>((props, ref) => {
  const formContext = useFormContext();

  if (formContext)
    return <OtpInputHookForm ref={ref} formContext={formContext} {...props} />;

  return <OtpInputBase ref={ref} {...props} />;
});
export default OtpInput;
