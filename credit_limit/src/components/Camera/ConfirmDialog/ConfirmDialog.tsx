import { Dialog } from '@material-ui/core';
import { ConfirmDialogProps } from './types';

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { show } = props;
  return (
    <Dialog open={show}>
      <div>
        <div>Keluar dari Registrasi?</div>
        <div>
          Apabila kamu keluar dari proses registrasi, kamu harus mengulang
          proses dari awal
        </div>
      </div>
      <div>
        <button>Tutup</button>
        <button>Ya, Keluar</button>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
