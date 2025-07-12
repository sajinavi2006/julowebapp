import { InputProps } from '../input';

export interface CurrencyInputProps extends Omit<InputProps, 'leftElement'> {
  currency?: string;
}
