export interface DatePickerProps {
  date?: string;
  onChange?: (value: string) => void;
  config?: {
    label?: string;
    helperText?: string;
    format?: string;
  };
  className?: string;
  errorClassName?: string;
  errorMessage?: string;
  disabled: boolean;
}
