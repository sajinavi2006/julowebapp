import { useContext } from 'react';

import { SnackbarContext } from './SnackbarProvider';

function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context)
    throw new Error('useSnackbar should be used within SnackbarProvider');

  return context;
}

export default useSnackbar;
