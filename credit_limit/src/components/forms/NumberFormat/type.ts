import { NumberFormatProps } from 'react-number-format';

export interface Props
  extends Omit<NumberFormatProps<HTMLInputElement>, 'getInputRef'> {
  inputRef: (el: HTMLInputElement) => void;
  onChange: (event: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
}
