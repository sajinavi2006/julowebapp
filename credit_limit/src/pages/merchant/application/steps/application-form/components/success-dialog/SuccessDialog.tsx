import { useHistory } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import { Button } from 'new-components/elements';

import { SuccessDialogProps } from './types';
import { successDialogCx } from './styles';
import { SuccessDialogContent } from './components';

const SuccessDialog = (props: SuccessDialogProps) => {
  const { isOpen } = props;
  const { replace } = useHistory();

  const onSubmit = () => {
    replace({
      pathname: '/merchant/axiata',
    });
  };

  return (
    <Dialog
      open={isOpen}
      css={successDialogCx}
      className='success-dialog-wrapper'
    >
      <DialogContent>
        <SuccessDialogContent />
      </DialogContent>
      <DialogActions>
        <Button variant='primary' fullWidth onClick={onSubmit}>
          Mengerti
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
