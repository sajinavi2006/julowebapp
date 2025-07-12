import { SnackbarProps } from '@material-ui/core';
import { AlertProps } from '@material-ui/lab';

export interface SnackbarProviderProps {
  children: React.ReactNode;
}

export interface SnackbarContextProps {
  showSnackbar: (snackbarOptions?: SnackbarOptions) => void;
}

export type SnackbarOptions = Omit<SnackbarProps, 'open' | 'onClose'> & {
  variant?: AlertProps['severity'];
};
