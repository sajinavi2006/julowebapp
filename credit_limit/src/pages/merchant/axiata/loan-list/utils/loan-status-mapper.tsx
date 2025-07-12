import Chip from 'components/Chip';

import {
  LOAN_DRAFT,
  LOAN_INACTIVE,
  LOAN_LENDER_APPROVAL,
  LOAN_PAID_OFF,
  LOAN_STATUS,
} from '../../constants';

export const loanStatusMapper = (status: number) => {
  if (status === LOAN_DRAFT) {
    return <Chip type='tertiary' label='Formulir dalam pengecekan' />;
  } else if (status === LOAN_INACTIVE) {
    return <Chip type='info' label='Butuh konfirmasi dokumen' />;
  } else if (status === LOAN_LENDER_APPROVAL || status === 212) {
    return <Chip type='warning' label='Pengajuan sedang diverifikasi' />;
  } else if (status === 216 || status === 219) {
    return <Chip type='error' label='Tidak disetujui' />;
  } else if (LOAN_STATUS.LOAN_ACTIVE.includes(status)) {
    return <Chip type='success' label='Disetujui' />;
  } else if (status === LOAN_PAID_OFF) {
    return <Chip type='default' label='Pinjaman sudah lunas' />;
  }

  return '';
};
