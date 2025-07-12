import { FormControlLabelProps } from '@material-ui/core';

export interface Props extends FormControlLabelProps {
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  name: string;
  row?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
  value?: string;
}
