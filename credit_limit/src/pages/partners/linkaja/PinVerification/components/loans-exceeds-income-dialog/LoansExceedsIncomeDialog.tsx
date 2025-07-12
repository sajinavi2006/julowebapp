import { LoanErrorDialog, LoanErrorDialogProps } from '../loan-error-dialog';
import { LoansExceedsIncomeBanner } from './shapes';
import { loansExceedsIncomeDialogCx } from './styles';

const LoansExceedsIncomeDialog = (props: LoanErrorDialogProps) => {
  const { show } = props;

  return (
    <LoanErrorDialog show={show}>
      <div
        css={loansExceedsIncomeDialogCx}
        className='loans-exceeds-income-dialog'
      >
        <LoansExceedsIncomeBanner width='100%' height='auto' />
        <p>
          Transaksi ini berpotensi melanggar aturan OJK, yaitu tagihan per bulan
          melebihi 50% dari total penghasilanmu.
          <br />
          <br />
          Silakan bayar tagihanmu terlebih dulu (jika ada) atau ubah tenor jadi
          lebih panjang, ya.
        </p>
      </div>
    </LoanErrorDialog>
  );
};

export default LoansExceedsIncomeDialog;
