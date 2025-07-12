import { InputBaseProps, TextFieldProps } from '@material-ui/core';
export interface InputProps extends Omit<InputBaseProps, 'onChange'> {
  className?: string;
  classNameInput?: string;
  errorClassName?: string;
  style?: React.CSSProperties;
  errorStyle?: React.CSSProperties;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
  isNumeric?: boolean;
  inputColor?: string;
  inputPropsMui?: TextFieldProps['InputProps'];
  isOutlined?: boolean;
  label?: string;
  name: string;
  onChange?: (val: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  preventFocusOnError?: boolean;
  readOnly?: boolean;
  type?: 'text' | 'textarea' | 'number' | 'numeric' | 'password';
  value?: string;
  variant?: 'filled' | 'outlined' | 'standard';
}
