import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectProps } from './types';

import SelectHookForm from './SelectHookForm';
import SelectBase from './SelectBase';

const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const formContext = useFormContext();

  if (formContext)
    return <SelectHookForm ref={ref} formContext={formContext} {...props} />;

  return <SelectBase ref={ref} {...props} />;
});

export default Select;
