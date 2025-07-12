import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
export interface Props
  extends AutocompleteProps<never, undefined, undefined, undefined> {
  allowInput?: boolean;
  className?: string;
  errorMessage?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  inputProps: object;
  onChange?: (val: string) => void;
  onSelect?: (val: string) => void;
  value: string;
}
