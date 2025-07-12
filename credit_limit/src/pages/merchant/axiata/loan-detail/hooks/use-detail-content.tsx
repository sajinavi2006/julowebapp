import {
  LoanConfirmation,
  LoanFailed,
  LoanInProgress,
  LoanSuccess,
  LoanVerifying,
} from 'new-components/shapes';
import { LoanDetailStatusType } from 'pages/merchant/types';

import { DescriptionText, TitleText } from '../components/loan-detail-texts';

import {
  LOAN_APPROVED,
  LOAN_CANCELLED,
  LOAN_CURRENT,
  LOAN_DRAFT,
  LOAN_INACTIVE,
  LOAN_LENDER_APPROVAL,
  LOAN_REJECTED,
} from '../../constants';

import { LoanInfoProps } from './types';

interface UseDetailContentProps {
  loanStatus: LoanDetailStatusType;
  email?: string;
}

export const useDetailContent = (props: UseDetailContentProps) => {
  const { loanStatus = LOAN_DRAFT, email } = props;
  
  let loanInfo: LoanInfoProps = {
    header: {
      step: 0,
      title: '',
      subtitle: '',
    },
    content: {
      icon: '',
      title: '',
      description: '',
    },
  };

  if (loanStatus === LOAN_DRAFT) {
    loanInfo = {
      header: {
        step: 1,
        title: 'Formulir Dalam Pengecekan',
        subtitle: 'Konfirmasi Dokumen Pinjaman',
      },
      content: {
        icon: <LoanInProgress />,
        title: <TitleText>Formulir Dalam Pengecekan</TitleText>,
        description: (
          <DescriptionText>
            Silakan tunggu maksimal 3 x 24 jam untuk lakukan konfirmasi dokumen
            pinjaman yang akan dikirimkan ke emailmu, ya!
          </DescriptionText>
        ),
      },
    };
  } else if (loanStatus === LOAN_INACTIVE) {
    loanInfo = {
      header: {
        step: 2,
        title: 'Konfirmasi Dokumen Pinjaman',
        subtitle: 'Pengajuan Pinjaman Diverifikasi JULO',
      },
      content: {
        icon: <LoanConfirmation />,
        title: <TitleText>Yuk, Konfirmasi Dokumen Pinjamanmu</TitleText>,
        description: (
          <DescriptionText>
            Dokumen telah di kirim ke email {email}. Cek email kamu atau klik{' '}
            <b>Konfirmasi Dokumen</b> di bawah, ya.
          </DescriptionText>
        ),
      },
    };
  } else if (loanStatus === LOAN_LENDER_APPROVAL) {
    loanInfo = {
      header: {
        step: 3,
        title: 'Pengajuan Diverifikasi Oleh JULO',
        subtitle: 'Hasil Verifikasi Pengajuan',
      },
      content: {
        icon: <LoanVerifying />,
        title: (
          <TitleText>Pengajuanmu Sedang Diverifikasi oleh Tim JULO</TitleText>
        ),
        description: (
          <DescriptionText>
            Harap tunggu, ya. Proses ini akan berlangsung 3x24 jam.
          </DescriptionText>
        ),
      },
    };
  } else if (loanStatus >= LOAN_CURRENT || loanStatus === LOAN_APPROVED) {
    loanInfo = {
      header: {
        step: 4,
        title: 'Pinjaman Disetujui dan Dicairkan',
        subtitle: '',
      },
      content: {
        icon: <LoanSuccess />,
        title: <TitleText>Asik, Pinjamanmu Disetujui dan Dicairkan!</TitleText>,
        description: (
          <DescriptionText>
            Silakan cek ke pihak distributor untuk tahu kalau danamu sudah
            dicairkan, ya!{' '}
          </DescriptionText>
        ),
      },
    };
  } else if (loanStatus === LOAN_CANCELLED) {
    loanInfo = {
      header: {
        step: 0,
        title: 'Pinjamanmu Tidak Disetujui',
        subtitle: '',
      },
      content: {
        icon: <LoanFailed />,
        title: <TitleText>Pinjamanmu Tidak Disetujui</TitleText>,
        description: (
          <DescriptionText>
            Tenang, kamu bisa ajukan lagi, kok. Pastikan semua dokumen dan
            datamu lengkap dan sesuai, ya!
          </DescriptionText>
        ),
      },
    };
  } else if (loanStatus === LOAN_REJECTED) {
    loanInfo = {
      header: {
        step: 0,
        title: 'Pinjaman Tidak Disetujui Oleh Peraturan OJK',
        subtitle: '',
      },
      content: {
        icon: <LoanFailed />,
        title: (
          <TitleText>Pinjamanmu Tidak Disetujui Oleh Peraturan OJK</TitleText>
        ),
        description: (
          <DescriptionText>
            Sesuai aturan OJK, kamu hanya bisa punya pinjaman di maks. 3
            aplikasi. Lunasi hingga tersisa 2 pinjaman aktif untuk transaksi di
            JULO, ya!
            <br /> <br />
            Jika sudah sesuai aturan OJK, tunggu 2x24 jam untuk coba ajukan
            lagi, ya!
          </DescriptionText>
        ),
      },
    };
  }

  const header = loanInfo.header;
  const content = loanInfo.content;

  return {
    header,
    content,
  };
};
