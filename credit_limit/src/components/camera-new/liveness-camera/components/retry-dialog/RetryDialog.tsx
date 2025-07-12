import { Dialog } from '@material-ui/core';
import { RetryDialogProps } from './types';
import { retryDialogCX } from './styles';

const RetryDialog = (props: RetryDialogProps) => {
  const { show, onClose } = props;

  const handleClose = (value: boolean) => {
    onClose(value);
  };

  return (
    <Dialog open={show} className={retryDialogCX}>
      <div className='dialogContent'>
        <div className='dialogTitle'>Coba Lagi, Ya</div>
        <div className='dialogMessage'>
          1. Pastikan pencahayaan cukup <br />
          2. Jangan gunakan masker dan topi <br />
          3. Pastikan posisi wajah di tengah <br />
          4. Jangan bergerak sampai proses selesai <br />
        </div>
        <div className='dialogButtons'>
          <button onClick={() => handleClose(true)} className='buttonRetry'>
            Ulangi
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default RetryDialog;
