import { SelectProps as DefaultSelectProps } from '@material-ui/core/Select';

export interface OptionObject extends Record<string, unknown> {
  title: string;
  value: string;
}

export type Option = OptionObject | string | number;

export interface SelectProps extends DefaultSelectProps {
  errorMessage?: string;
  options?: Option[];
  renderOptions?: (value: OptionObject) => string;
  renderIcon?: (value: Option) => string;
}
