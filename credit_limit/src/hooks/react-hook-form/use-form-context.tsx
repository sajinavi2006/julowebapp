import { useContext } from 'react';
import {
  FieldValues,
  useFormContext as useDefaultFormContext,
} from 'react-hook-form';

import { FormContext } from './components/form-provider';
import { UseFormReturn } from './types';

const useFormContext = <TFieldValues extends FieldValues>(): UseFormReturn<
  TFieldValues,
  unknown
> => {
  const { fieldsRef } = useContext(FormContext);
  const form = useDefaultFormContext<TFieldValues>();

  return { fieldsRef, ...form };
};

export default useFormContext;
