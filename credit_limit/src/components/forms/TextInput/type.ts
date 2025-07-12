import { HTMLAttributes } from 'react';
import { FormControlProps } from 'react-bootstrap';

export interface Props
  extends FormControlProps,
    Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  allow: string;
  value?: string;
  autofocus: boolean;
  className: string;
  errorMessage: string;
  handleEnter: () => void;
  maxLength: number;
  maxLengthCheck: boolean;
  saveToLocalStorage: boolean;
  setValue: (value: string) => void;
  showNotification: boolean;
  // validator can be function | object | boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validator: any;
}
