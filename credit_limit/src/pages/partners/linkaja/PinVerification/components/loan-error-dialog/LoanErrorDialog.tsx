import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Global, css } from '@emotion/react';

import { Button } from 'new-components/elements';

import { loanErrorDialogCx } from './styles';
import { LoanErrorDialogProps } from './types';
import { DialogTransition } from './components';

const LoanErrorDialog = (props: LoanErrorDialogProps) => {
  const { show, children } = props;
  const history = useHistory();

  return (
    <Dialog
      open={show}
      css={loanErrorDialogCx}
      TransitionComponent={DialogTransition}
      className='loan-error-dialog'
    >
      <DialogTitle>Kamu Belum Bisa Transaksi</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => history.push('home')} fullWidth>
          Mengerti
        </Button>
      </DialogActions>
      <Global
        styles={css`
          html {
            font-size: 16px !important;
          }
        `}
      />
    </Dialog>
  );
};

export default LoanErrorDialog;
