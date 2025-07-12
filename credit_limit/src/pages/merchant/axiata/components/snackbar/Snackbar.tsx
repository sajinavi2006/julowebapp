import SnackbarMaterial from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

import useSnackbar from './use-snackbar';

const Snackbar = () => {
  const { message, severity, closeSnackbar } = useSnackbar();
    
  return (
    <SnackbarMaterial
      open={!!message}
      autoHideDuration={5000}
      onClose={() => closeSnackbar()}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => closeSnackbar()} severity={severity}>
        {message}
      </Alert>
    </SnackbarMaterial>
  );
};

export default Snackbar;
