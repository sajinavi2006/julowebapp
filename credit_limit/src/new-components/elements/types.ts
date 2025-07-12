import { RegisterOptions } from 'react-hook-form';

export type Rules = Omit<
  RegisterOptions<Record<string, string>, string>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export interface FieldBaseProps {
  /**
   * @description works only when field is under FormProvider by react-hook-form
   */
  rules?: Rules;
  name: string;
  label?: string;
  helperText?: string;
  /**
   * @description will using default HTML required tag when field is not under FormProvider by react-hook-form
   */
  required?: boolean;
  isInvalid?: boolean;
}
