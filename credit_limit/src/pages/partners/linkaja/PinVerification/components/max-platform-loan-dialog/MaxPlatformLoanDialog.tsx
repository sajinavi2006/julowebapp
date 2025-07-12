import { LoanErrorDialog, LoanErrorDialogProps } from '../loan-error-dialog';
import { CannotDoTransaction } from './shapes';
import { MaxPlatformLoanInfo } from './components';
import { maxPlatformLoanDialogCx } from './styles';

const MaxCreditLoanDialog = (props: LoanErrorDialogProps) => {
  const { show } = props;

  return (
    <LoanErrorDialog show={show}>
      <div css={maxPlatformLoanDialogCx} className='max-platform-loan-dialog'>
        <CannotDoTransaction
          className='cannot-do-transaction-image'
          width='100%'
          height='auto'
        />
        <p>
          Sesuai aturan OJK, kamu hanya bisa punya pinjaman di maks. 3 aplikasi.
          Lunasi hingga tersisa 2 pinjaman aktif untuk melanjutkan transaksi,
          ya!
          <br />
          <br />
          Jika pinjamanmu sudah lunas, harap tunggu 1x24 jam untuk coba lagi
          atau hubungi CS JULO.
        </p>
        <MaxPlatformLoanInfo />
      </div>
    </LoanErrorDialog>
  );
};

export default MaxCreditLoanDialog;
