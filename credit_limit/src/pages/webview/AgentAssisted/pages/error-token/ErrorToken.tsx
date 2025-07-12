import { Logo } from 'new-components/shapes';

import { Button } from 'new-components/elements';
import { errorTokenCx } from './styles';

const ErrorToken = () => {
  return (
    <div css={errorTokenCx} className='error-token'>
      <Logo fill='white' className='logo' />
      <div className='card error-token-content'>
        <div className='text-wrapper'>
          <div className='title'>Link Buat PIN Sudah Kadaluarsa</div>
          <div className='description'>
            Silakan hubungi CS JULO untuk dapatkan link baru lagi, ya.
          </div>
        </div>
        <Button
          className='contact-btn'
          onClick={() => window.open('tel:02150919034')}
        >
          Kontak CS
        </Button>
      </div>
    </div>
  );
};

export default ErrorToken;
