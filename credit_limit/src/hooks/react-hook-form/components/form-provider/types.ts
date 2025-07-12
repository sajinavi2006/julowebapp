import { MutableRefObject } from 'react';
import type {
  FormProviderProps as DefaultFormProviderProps,
  FieldValues,
} from 'react-hook-form';

export interface FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> extends DefaultFormProviderProps<TFieldValues, TContext> {
  fieldsRef: MutableRefObject<Record<string, HTMLDivElement | null>>;
  scrollToFieldOnError?: boolean;
}

export interface FormContextProps {
  fieldsRef: MutableRefObject<Record<string, HTMLDivElement | null>>;
}
