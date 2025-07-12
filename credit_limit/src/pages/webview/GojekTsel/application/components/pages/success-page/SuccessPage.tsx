import { ApplicationApproved } from './shapes';
import { successPageCx } from './styles';

const SuccessPage = () => {
  return (
    <div css={successPageCx} className='success-page'>
      <div className='success-page-card'>
        <ApplicationApproved width={107} height={107} />
        <p className='success-page-title'>Form Berhasil Terkirim!</p>
        <p className='success-page-content'>
          Silakan tunggu datamu diproses, ya! Tim JULO akan menghubungi kamu.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
