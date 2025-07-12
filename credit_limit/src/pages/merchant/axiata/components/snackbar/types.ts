import { AlertProps } from '@material-ui/lab';

export interface SnackbarProviderProps {
  children: React.ReactNode;
}

export interface SnackbarContextProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  severity: AlertProps['severity'];
  setSeverity: React.Dispatch<React.SetStateAction<AlertProps['severity']>>;
  closeSnackbar: React.Dispatch<void>;
}
