import { FieldValues, useForm as useDefaultForm } from 'react-hook-form';
import { UseFormProps, UseFormReturn } from './types';
import { useRef } from 'react';

const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>(
  props: UseFormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext> => {
  const form = useDefaultForm<TFieldValues, TContext>(props);

  const fieldsRef = useRef<Record<string, HTMLDivElement | null>>({});

  return { fieldsRef, ...form };
};

export default useForm;
