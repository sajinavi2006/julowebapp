import { Dialog } from '@material-ui/core';
import { ConfirmDialogProps } from './types';
import { confirmDialogCX } from './styles';

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { show, onClose } = props;

  const handleClose = (value: boolean) => {
    onClose(value);
  };

  return (
    <Dialog open={show} className={confirmDialogCX}>
      <div className='dialogContent'>
        <div className='dialogTitle'>Keluar dari Liveness Check?</div>
        <div className='dialogMessage'>
          Kamu harus mengulang proses Liveness Check dari awal, lho.
        </div>
        <div className='dialogButtons'>
          <button onClick={() => handleClose(false)} className='buttonClose'>
            Keluar
          </button>
          <button onClick={() => handleClose(true)} className='buttonOk'>
            Lanjutkan Proses
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
