import { createContext, useCallback, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { _noop } from '@julofinance/web-helpers/dist/fn';

import {
  SnackbarProviderProps,
  SnackbarContextProps,
  SnackbarOptions,
} from './types';
import { snackbarCx } from './styles';

export const SnackbarContext = createContext<SnackbarContextProps>({
  showSnackbar: _noop,
});

const SnackbarProvider = (props: SnackbarProviderProps) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>();

  const handleOpen = useCallback((options?: SnackbarOptions) => {
    setIsOpen(true);
    setSnackbarOptions(options);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar: handleOpen }}>
      {children}
      <Snackbar
        className='snackbar-wrapper'
        css={snackbarCx}
        open={isOpen}
        onClose={handleClose}
        {...snackbarOptions}
      >
        <Alert
          icon={false}
          onClose={handleClose}
          severity={snackbarOptions?.variant || 'info'}
        >
          {snackbarOptions?.message || ''}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
