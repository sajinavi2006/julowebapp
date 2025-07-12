import { useContext } from 'react';

import { SnackbarContext } from './SnackbarProvider';

function useShowSnackbar() {
  return useContext(SnackbarContext);
}

export default useShowSnackbar;
