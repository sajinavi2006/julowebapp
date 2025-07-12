import { createContext, useState } from 'react';
import { AlertProps } from '@material-ui/lab';

import { SnackbarContextProps, SnackbarProviderProps } from './types';

export const SnackbarContext = createContext<SnackbarContextProps>({
  message: '',
  severity: 'error',
  setMessage: () => {},
  setSeverity: () => {},
  closeSnackbar: () => {},
});

const SnackbarProvider = (props: SnackbarProviderProps) => {
  const { children } = props;

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('error');

  const closeSnackbar = () => {
    setMessage('');
  };

  return (
    <SnackbarContext.Provider
      value={{
        setMessage,
        message,
        severity,
        setSeverity,
        closeSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
