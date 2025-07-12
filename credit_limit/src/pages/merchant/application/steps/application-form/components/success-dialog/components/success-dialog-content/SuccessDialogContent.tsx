import { VerificationData } from './shapes';
import { successDialogContentCx } from './styles';

const SuccessDialogContent = () => {
  return (
    <div css={successDialogContentCx} className='success-dialog-content'>
      <VerificationData width={104} height={101} className='success-dialog-icon' />
      <div className='success-dialog-title'>Pengajuanmu Berhasil Dikirim!</div>
      <div className='success-dialog-description'>
        Pihak JULO sedang memproses formulir kamu. Kami akan kirimkan hasilnya
        melalui email, ya.
      </div>
    </div>
  );
};

export default SuccessDialogContent;
